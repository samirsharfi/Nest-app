#!/bin/bash

echo "Starting rate limit test..."
echo "Will make 101 requests (limit is 100 per 2 minutes)"
echo "----------------------------------------"

for i in {1..101}
do 
    echo -n "Request $i: "
    curl -s -w "HTTP Status: %{http_code}\n" http://localhost:3000/
    sleep 0.1  # Small delay to make output more readable
done