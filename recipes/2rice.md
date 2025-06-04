---
layout: post
summary: It tastes just like home... work.
title: Greasy BC Calc Fried Rice
image: images/rice.png
type: recipe
permalink: /recipes/rice
---

For years, we have been trying to nail the perfect **Greasy BC Calc Fried Rice recipe**, but we've always been missing one special ingredient. But it isn't love; it's calculus. Although, what's the difference? We believe that like a derivative, a perfect recipe is something you have to derive. These steps, simple yet integral to the cooking process, will help you make a recipe that tests the limits of gastronomy.

### Ingredients

<div style="border: 3px solid #888; padding: 1em;">
\(f(1)=1;\, f^{\prime}(1)=2;\, f(2) \approx x\) clove(s) garlic <br>
\(\displaystyle\sum_{n=0}^1  \frac{1^n}{n!}\) medium scallion(s) <br>
4 cup(s) cooked rice <br>
\(f(x)=\frac{1}{5}x^{\frac{5}{3}};\, f^{\prime}(27)\) tablespoon(s) vegetable oil <br>
\(\int_{0}^{5}2{x}-\frac{125}{8}{x}^2\, dx \) cup(s) frozen peas and carrots <br>
\(\sin^2{x} + \cos^2{x}\) tablespoon(s) soy sauce <br>
2 large egg(s) <br>
\(\frac{d}{dx} \frac{3}{4}x\) teaspoon(s) roasted sesame oil
</div>

### On a Completely Unrelated Note: Euler's Method

If there was a Mount Rushmore for mathematicians, Leonhard Euler would be three heads while Mr. Corbett would be the fourth. He's discovered a great many things about math and even calculus in particular. On the topic of sesame oil, we'll look at one of his methods—Euler's Method. Consider the following differential equation:
> \\(\frac{dy}{dx} = x^2 + \ln y\\)

and the following starting value:
> \\(f(0) = 3\\)

finally, let's say that we want to find the value of \\(f(2)\\).

We cannot separate this differential equation, which means, for this level of calculus, we will have to approximate it. Euler's Method is a lot like linearization. First, we substitute our starting \\(x\\) and \\(y\\) values into the differential equation.

> \\(\frac{dy}{dx} = 0^2 + \ln 3 = \ln 3\\)

Now we know the slope of the tangent line at \\((0, 3)\\). Since the tangent line represents the overall function \\(f(x)\\) on a small scale, we can use this to approximate like in linearization. If we use this tangent line for a large increase of \\(x\\), it will not be accurate to the original function. So, we'll pick a small <em><small>step</small></em> to account for this. We'll use \\(1\\). So,
> \\(f(1) \approx f(0) + (\ln 3)(1)\\) <br>
> \\(= 3 + \ln 3\\)

This gives us a new approximate \\(x\\) and \\(y\\) coordinate of \\((1, 3 + \ln 3)\\). We can repeat this process again to get a new slope.
> \\(\frac{dy}{dx} = 1^2 + \ln(3 + 3\ln 3) = 1 + \ln(3 + 3\ln 3) \approx 2.411\\) <br>
> \\(f(2) \approx f(1) + 2.411(1) \approx 6.510\\)

We hope you finally have some closure from the Free Response questions on the AP Test. As for the rest of the recipe, it's left as an exercise for the reader.

