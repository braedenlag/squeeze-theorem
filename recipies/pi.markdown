---
layout: post
summary: An approximation of \(\pi\) using a Taylor Series.
title: A Delicious Pi Approximation
image: images/pi.png
---

\\(\pi\\) is a transcendental number, which means that it is not algebraic—we'll have to derive its value using an infinite series. Therefore, we'll use a 
Taylor Series for some function \\(f(x)\\) to create a Taylor Polynomial that will help us approximate \\(\pi\\).

We can get the \\(nth\\) term of a Taylor Polynomial using the formula
\\(\frac{f^{(n)}(a)}{n!}(x-a)^n\\). We can set \\(a = 0\\), which means we now have a Maclaurin Series that will make calculations easier. But we
still need to choose our function \\(f(x)\\). There are some different options, but for ease of calculation \\(\tan^{-1}(x)\\) is a great choice.
\\(\tan^{-1}(1)=\frac{\pi}{4}\\), and
\\(\frac{d}{dx}\tan^{-1}(x)=\frac{1}{1+x^2}\\) which is simpler than some alternatives we could try such as \\(\sin^{-1}(x)\\) or \\(\cos^{-1}(x)\\).

We can compute the Taylor Series to be the following:

> \\(0x^{0} + 1x^{1} + 0x^{2} -\frac{1}{3}x^{3} + 0x^{4} + \frac{1}{5}x^{5} + ... \\)

It turns out that every term where \\(n\\) is even is equal to zero, and the terms where \\(n\\) is odd alternate signs and follow the pattern \\(\frac{1}{n}x^{n}\\). To rewrite this sequence into a series, we can ignore the zero terms and focus only the non-zero terms, treating \\(x\\) as the first term, \\(-\frac{1}{3}x^{3}\\) as the second, etc. Therefore, 
>\\(\tan^{-1}(x)=\displaystyle\sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{2n+1}\\)


Now to approximate \\(\pi\\), we'll use \\(x=1\\) since \\(\tan^{-1}(1)=\frac{\pi}{4}\\) and we'll multiply the series by 4 to get the value of \\(\pi\\) instead of \\(\frac{\pi}{4}\\). Our new series is:
> \\(\pi=4\displaystyle\sum_{n=0}^\infty  \frac{(-1)^n}{2n+1}\\)

### Calculating error bound

Since we can only calculate a finite number of terms for the series, we'll have some error. Our series is an alternating series, which means
>\\(\|R_n(x)\|\leq\|\frac{4(-1)^n}{2(n+1)+1}\|\\)

>\\(=\|R_n(x)\|\leq\frac{4}{2n+3}\\)

Therefore if we want digit \\(x\\) to be accurate, we can simply solve the inequality:
> \\(-10^{-x}\leq\frac{4}{2n+3}\leq10^{-x}\\) 

Below is an implementation of the Maclaurin Series to approximate \\(\pi\\) yourself. You can either set the number of terms, or the amount of accurate digits. Given the error bound, each new digit requires 10x the iterations of the previous digit—to prevent slowdowns we have capped the number of accurate digits at 7, or approximately 20,000,000 terms. 

<aside>
<script src="pi.js"></script>
<div id="pi-approx">
    <h1>approximating pi</h1>
    <div id="approximation">
        \(\color{#f22844}\pi\approx\) <span id="pi-result">\({3.141092}\)</span>
    </div>
    <div id="controls">
        <div><h2>terms \(=\) </h2><input id="n-value" type="number" step="1" min="0" max="20000000" value="2000"></div>
        <div><h2>accurate digits \(=\) </h2><input id="accurate-digits" type="number" step="1" min="0" max="7" value="3"></div>
    </div>
</div>
</aside>