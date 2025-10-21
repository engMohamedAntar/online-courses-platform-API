# Dockerfile
FROM node:22.17.0
WORKDIR /online-course-platform
COPY package.json .
RUN npm install --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm" , "run", "start:prod"]
