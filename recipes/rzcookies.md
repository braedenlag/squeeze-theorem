---
layout: post
summary: What a wonderful problem for the AP Test!
title: Ellipse Shaped Cookies
image: images/cookie.png
type: recipe
permalink: /recipes/cookies
---

An ellipse is represented by the parametric equation \\(x(t)=a\cos t, y(t)=b\sin t\\) where \\(a\\) is the farthest distance from the origin along the x-axis and b is the farthest distance from the origin along the y-axis.

How to find the area of the cookies? Our cookies are about 2.5 inches across the x-axis and 4 inches across the y-axis, so \\(a=\frac{5}{4}\\) and \\(b=2\\). Therefore, the equation we will be using for the ellipse is \\(x(t)=\frac{5}{4}\cos t, y(t)=2\sin t\\).  The formula to find the area is \\(A=\pi ab\\). But that would be too easy! We've struggled through enough problems on the whiteboards to know that calculus is really about virtue—so we are going to integrate instead.

The area formula for parametric curves is \\(A = \frac{1}{2} \int_{0}^{2\pi} x(t)y^{\prime}(t) - y(t)x^{\prime}(t)\, dt\\). We can find that
> \\(x^{\prime}(t)=-\frac{5}{4} \sin t\\) <br>
> \\(y^{\prime}(t)=2\cos t\\)


Substituting these values into the formula yields
> \\(A = \frac{1}{2} \int_{0}^{2\pi} \frac{5}{2}\cos^{2}t+\frac{5}{2}\sin^{2}t\, dt\\)

Now we can factor out \\(\frac{5}{2}\\):
> \\(A = \frac{5}{4} \int_{0}^{2\pi} \cos^{2}t+\sin^{2}t\, dt\\)

Now using the Pythagorean Identity \\(\cos^{2}t+\sin^{2}t = 1\\), 
> \\(A = \frac{5}{4} \int_{0}^{2\pi} 1\, dt\\)

Finally, integration shows that
> \\(A = \frac{5}{4}t \, \bigg \|_{0}^{2\pi}\\) <br><br>
> \\(A = \frac{5}{4} (2\pi - 0)\\) <br><br>
> \\(A = \frac{5\pi}{2}\\) <br>

We can prove our answer using the ellipse formula, \\(A=\pi ab\\). We can see that
> \\(A = \pi \frac{5}{4}(2) = \frac{5\pi}{2} = A = \frac{1}{2} \int_{0}^{2\pi} \frac{5}{2}\cos^{2}t+\frac{5}{2}\sin^{2}t\, dt\\)

It may not be as useful as the optimal taco bite, or as cool as a calculus word search, but if you are making these kinds of cookies, you'll know exactly how much frosting to use.