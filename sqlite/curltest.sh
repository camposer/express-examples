#!/bin/bash

echo "GET all"; curl -X GET http://localhost:3000/rest/users; echo
echo "GET one"; curl -X GET http://localhost:3000/rest/users/1; echo
echo "PUT"; curl -X PUT -H "Content-type:application/x-www-form-urlencoded" -d "name=rodolfo" http://localhost:3000/rest/users; echo
echo "POST"; curl -X DELETE -H "Content-type:application/x-www-form-urlencoded" -d "id=1&name=juan" http://localhost:3000/rest/users; echo
echo "DELETE"; curl -X DELETE -H "Content-type:application/x-www-form-urlencoded" -d "id=1" http://localhost:3000/rest/users; echo
