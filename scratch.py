def fib(a, b, n):
    if n <= 0:
        return
    c = a + b
    print(c)
    fib(b, c, n-1)


fib(1, 1, 100)

