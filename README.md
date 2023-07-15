# Chronic Stocks
A site about stocks.

## How it works

**Goal:** Find closest stock charts (visually).

What this means is that, given a list of numbers (prices) which visually we represent with peaks and valleys, we want to find other periods
where the peaks and valleys look pretty close. Your intuition probably is to simply subtract two periods (we will assume all prices are normalized somehow)
and select the period whose difference is the most *flat*. This works to some extent but isn't really great at understanding the edge cases/outliers.

In this site, a different approach is used: **KL Divergence**.

![KL Divergence](static/KL-Divergence.svg)

KL (Kullback-Leibler) divergence (aka relative entropy) is a measure of difference in two probablility
distributions. Or, given distributions *P* and *Q*, the KL Divergence of *P* from *Q* is a measure of how well *Q* would perform
as a model when the actual distribution is *P*.

With this tool, we may begin. We start with the selected period, *P*, which users pick on the site. We then divide the stocks to search in into periods of equal length (*Q*).
We now calculate KL-Divergence of each *q* relative to *P* and then sort all periods in order of KL Divergence and *voila*.\* At the front of our list of *Q*

<sub>\*One thing I forgot to mention is that stock charts are not probability distributions, obviously, but to get around that we simply normalize each period such that the sum
of prices in the period is equal to 1 and *wow, would you look at that*...</sub>


## How it's made
This site was built with [Svelte/Sveltekit](https://svelte.dev) and [Skeleton](https://skeleton.dev) and hosted via [Vercel](https://vercel.com).

## Developing

If, god forbid, you want to use this locally...
Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
#or pnpm/yarn
```

You can preview the production build with `npm run preview` (or pnpm/yarn).

> To deploy, you may need to select and install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment (I am using Vercel).
