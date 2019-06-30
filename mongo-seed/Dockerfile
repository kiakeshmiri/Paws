FROM mongo:latest

COPY init.json /init.json
CMD mongoimport --host pawsmongodb --db pawsDB --collection diary --type json --file /init.json --jsonArray