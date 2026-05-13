import os
import pytest
import requests

BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")


def test_add_positifs():
    r = requests.get(f"{BASE_URL}/add/10/5")
    assert r.status_code == 200
    assert r.json()["result"] == 15

def test_add_negatif():
    r = requests.get(f"{BASE_URL}/add/-3/7")
    assert r.json()["result"] == 4

def test_add_decimaux():
    r = requests.get(f"{BASE_URL}/add/1.5/2.5")
    assert r.json()["result"] == 4.0

def test_subtract_basique():
    r = requests.get(f"{BASE_URL}/subtract/10/5")
    assert r.status_code == 200
    assert r.json()["result"] == 5

def test_subtract_negatif():
    r = requests.get(f"{BASE_URL}/subtract/3/7")
    assert r.json()["result"] == -4

def test_multiply_basique():
    r = requests.get(f"{BASE_URL}/multiply/4/3")
    assert r.status_code == 200
    assert r.json()["result"] == 12

def test_multiply_par_zero():
    r = requests.get(f"{BASE_URL}/multiply/9/0")
    assert r.json()["result"] == 0

def test_multiply_negatifs():
    r = requests.get(f"{BASE_URL}/multiply/-2/-3")
    assert r.json()["result"] == 6

def test_divide_basique():
    r = requests.get(f"{BASE_URL}/divide/10/2")
    assert r.status_code == 200
    assert r.json()["result"] == 5

def test_divide_decimaux():
    r = requests.get(f"{BASE_URL}/divide/7/2")
    assert r.json()["result"] == 3.5

def test_divide_par_zero():
    r = requests.get(f"{BASE_URL}/divide/5/0")
    assert r.status_code == 400
    assert "zéro" in r.json()["error"]

def test_divide_zero_sur_nombre():
    r = requests.get(f"{BASE_URL}/divide/0/5")
    assert r.json()["result"] == 0
