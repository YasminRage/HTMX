from django.shortcuts import render
from django.http import HttpResponse
import time
import random


def sample_post(request, *args, **kwargs):
    print(f"{request.POST = }")

    name = request.POST.get("name", "")
    email = request.POST.get("email", "")
    age = request.POST.get("age", "")
    favourite_colour = request.POST.get("favourite_color", "")

    if name and email and favourite_colour and age:
        return HttpResponse(
            "<p class='success'>Form submitted successfully! ✅</p>"
        )
    else:
        return HttpResponse(
            "<p class='error'>Please provide name, email, favourite colour, and age. ❌</p>"
        )


def example(request):
    return render(request, "example.html")


def try_my_luck(request):
    if request.method == "POST":
        time.sleep(2)

        outcomes = ["Win", "Lose", "Jackpot"]
        result = random.choice(outcomes)

        return HttpResponse(f"<h3>{result}</h3>")

    return HttpResponse("<p>Invalid request</p>")