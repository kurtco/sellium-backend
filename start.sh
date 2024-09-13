#!/bin/bash
export NODE_OPTIONS="--max-old-space-size=1024"  # Aumenta el tamaño de la memoria a 1GB (ajusta según lo que necesites)
npm run start:prod
