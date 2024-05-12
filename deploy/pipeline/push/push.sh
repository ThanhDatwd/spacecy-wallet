#!/bin/bash

echo "************************************************"
echo "** Push Docker image for Frontend to Registry ***"
echo "************************************************"

docker login -u metaspacecy -p $PASS
docker push metaspacecy/frontend:$BUILD_NUMBER