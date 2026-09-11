from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tracer.engine import trace_hanoi

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is working!"}

@app.get("/api/trace/hanoi")
def get_hanoi_trace(n: int = 3):
    steps = trace_hanoi(n)
    return {"steps": steps}