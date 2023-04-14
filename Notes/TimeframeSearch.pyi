# Return the list of timeframes that are matched by our normalization techniques
import random

import numpy as np
import pandas as pd




def kl_divergence(p, q):
    return np.sum(np.where(p != 0, p * np.log(p / q), 0))

# Normalization Techniques
def normalize_pdf(data):
    return data / data.sum()

def normalize_range_scale(data):
    return (data - (data.min()) + 0.001) / (data.max() - data.min())

# don't have the gumption to figure out how 0's are still getting into my log.... :(
def normalize_log(data):
    return np.log(np.abs(data) + 0.001)

def normalize_zscore(data):
    return (data - np.mean(data)) / np.std(data)

def normalize_dprice(data):
    return data.pct_change(-1)

def prepare(df):
    df.reset_index(inplace=True)
    df['NormClose'] = normalize_pdf(df['Close'])
    df['NormRange'] = normalize_range_scale(df['Close'])
    df['NormLog'] = normalize_log(df['Close'])
    df['NormZScore'] = normalize_zscore(df['Close'])
    df['NormDPrice'] = normalize_dprice(df['Close'])

spy = pd.read_csv('../data/SPY.csv')

def sample_kl(num_samples: int):
    """
    Randomly samples a period of time from the SPY data and then finds the best match for that period, utilizing
    techniques from 'Normalization' and 'Measuring Similarity' notebooks.

    Returns a dataframe where the columns are the different normalization techniques and the rows represent the best match
    found during each sample.

    :param num_samples: The number of samples to take.
    """
    results = pd.DataFrame(columns=['PDF', 'Range', 'Log', 'Z-Score', 'dPrice'])
    for _ in range(num_samples):
        # Get a random period.
        p_duration = random.randint(10, 100)
        p_start = random.randint(0, len(spy) - p_duration)
        p = spy.iloc[p_start:p_start + p_duration]
        # Get our random period and other periods.
        p = spy.iloc[p_start : p_start + p_duration]
        q_range1 = [spy.iloc[i:i+p_duration] for i in range(0, p_start-p_duration, p_duration)]
        q_range2 = [spy.iloc[p_start + p_duration : i + p_start + p_duration] for i in range(p_start + p_duration, len(spy), p_duration)]
        # Ensure we don't have any straggler ranges.
        all_q = [q for q in q_range1 + q_range2 if len(q) == p_duration]

        # Normalize and Prepare Data
        prepare(p)
        for q in all_q:
            prepare(q)
        # Fetch the best matches in each category.
        best_matches = {
            'PDF': min(all_q, key=lambda q: kl_divergence(p['NormClose'], q['NormClose'])),
            'Range': min(all_q, key=lambda q: kl_divergence(p['NormRange'], q['NormRange'])),
            'Log': min(all_q, key=lambda q: kl_divergence(p['NormLog'], q['NormLog'])),
            'Z-Score': min(all_q, key=lambda q: kl_divergence(p['NormZScore'], q['NormZScore'])),
            'dPrice': min(all_q, key=lambda q: kl_divergence(p['NormDPrice'], q['NormDPrice'])),
        }
        results.append(best_matches, ignore_index=True)
    return results

if __name__ == '__main__':
    test = sample_kl(3)
    print(test)