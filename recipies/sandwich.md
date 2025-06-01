---
layout: post
summary: Who knew the squeeze theorem could be useful?
title: The Sandwich Theorem
image: images/sandwich.png
type: recipie
permalink: /recipies/sandwich
---

There comes a time in everyone's life where, no matter how hard we try, we just cannot evaluate \\(\lim\limits_{x\rarr0}x^2\sin(\frac{1}{x^2})\\). It is a gatekeeper to the echelons of calculus, yet, with the proper tools, the evaluation becomes quite simple.

Our biggest obstacle is the \\(\sin(\frac{1}{x^2})\\) factor. Normally,
> \\(\lim\limits_{x\rarr{a}}f(x)\cdot{g(x)} = \lim\limits_{x\rarr{a}}f(x) \cdot \lim\limits_{x\rarr{a}}g(x)\\)

But as \\(\lim\limits_{x\rarr{0}}\sin(\frac{1}{x^2})\\) does not exist, we'll have to try another method.

### Introducing: The Squeeze Theorem

The Squeeze Theorem, also known as the sandwich theorem, states that on an interval where \\(a\\) is included, and \\(f(x)\\), \\(g(x)\\), and \\(h(x)\\) are defined on every point of the interval with sometimes the exception of \\(a\\), and \\(g(x)\leq f(x) \leq h(x)\\), if
>  \\(\lim\limits_{x\rarr{a}}g(x) = L = \lim\limits_{x\rarr{a}}h(x)\\) <br>
> then \\(\lim\limits_{x\rarr{a}}f(x) = L\\)

Essentially, we can "squeeze" a difficult function in between two "simpler" functions with known limits, and if the two outer functions have the same limit, than the inner function must also have that same limit. Now the question becomes, which functions do we squeeze \\(x^2\sin(\frac{1}{x^2})\\) in between?

We can start by just looking at the \\(\sin(\frac{1}{x^2})\\) factor. The \\(\sin\\) function has a range of \\([-1, 1]\\) which means that
> \\(-1 \leq \sin(\frac{1}{x^2}) \leq 1\\)

From here, we can just multiply all sides of the inequality by \\(x^{2}\\), which results in
> \\(-x^2 \leq x^2\sin(\frac{1}{x^2}) \leq x^2\\)

When we find the limits of the outer functions, we can see that
> \\(\lim\limits_{x\rarr{0}}-x^2 = 0 = \lim\limits_{x\rarr{0}}x^2\\)

which, via the squeeze theorem, means that
> \\(\lim\limits_{x\rarr{0}}x^2\sin(\frac{1}{x^2}) = 0\\)

An interactive Desmos graph of the three equations is shown below. Notice how \\(f(x)\\) lies in between \\(g(x)\\) and \\(h(x)\\).

<aside>
<iframe src="https://www.desmos.com/calculator/yfcchuv2hx" title="Squeeze Theorem Desmos example graph" width="100%" height="500" frameborder="none">
</aside>