def trace_hanoi(n=3):
    """
    Tower of Hanoi ko trace karta hai — har move ke saath
    explanation aur us waqt ka call stack snapshot bhi record karta hai.
    """
    steps = []
    call_stack = []  # yeh list hamesha "abhi kaunse function calls active hain" track karegi

    def snapshot_stack():
        # Stack ki current state ki ek copy banata hai (taaki baad mein change na ho)
        return [frame.copy() for frame in call_stack]

    def hanoi(n, source, auxiliary, target, depth=0):
        # Function shuru hote hi, apna frame stack mein push karo
        frame = {"n": n, "source": source, "auxiliary": auxiliary, "target": target}
        call_stack.append(frame)

        if n == 1:
            explanation = (
                f"Disk 1 is the smallest disk. It can always move safely onto any rod, "
                f"because no disk can ever be smaller than it. So we move it directly "
                f"from rod {source} to rod {target}."
            )
            steps.append({
                "action": "move",
                "disk": 1,
                "from": source,
                "to": target,
                "depth": depth,
                "explanation": explanation,
                "call_stack": snapshot_stack()
            })
        else:
            # Part 1: chhote (n-1) disks ko raaste se hatao, auxiliary rod pe
            hanoi(n - 1, source, target, auxiliary, depth + 1)

            # Part 2: ab sirf disk n bacha hai source pe — usse target pe le jao
            explanation = (
                f"All {n - 1} smaller disk(s) have already been moved onto rod {auxiliary} "
                f"to clear the way. Rod {source} now holds only disk {n} (the biggest disk "
                f"in this step), so it is safe to move disk {n} directly from rod {source} "
                f"to rod {target}."
            )
            steps.append({
                "action": "move",
                "disk": n,
                "from": source,
                "to": target,
                "depth": depth,
                "explanation": explanation,
                "call_stack": snapshot_stack()
            })

            # Part 3: woh (n-1) disks wapas target pe le jao, disk n ke upar
            hanoi(n - 1, auxiliary, source, target, depth + 1)

        # Function khatam ho raha hai — apna frame stack se pop karo
        call_stack.pop()

    hanoi(n, "A", "B", "C")
    return steps