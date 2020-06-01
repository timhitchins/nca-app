# Neighbors for Clean Air Campaign Toolkit

(This application is in development)

To start this application in development, clone the repository.

There are two `package.json` files for installing modules in the client and server.

For the server:

```
cd ./nca-app
npm install
```

For the client:

```
cd ./nca-app/client
npm install
```

To run the stack in development after installs, change back the root directory and

```
npm run dev
```

The feature service used to generate map data can be found here:
```
https://www.portlandmaps.com/arcgis/rest/services/Public/BDS_Permit/FeatureServer/22/query
```