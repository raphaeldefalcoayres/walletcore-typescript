#!/bin/sh

npm run cti create './src/shared/dto' -- -i '*spec.ts' -b && 
npm run cti create './src/shared/entities' -- -i '*spec.ts' -b && 
npm run cti create './src/shared/errors' -- -i '*spec.ts' -b && 
npm run cti create './src/shared/repository' -- -i '*spec.ts' -b && 
npm run cti create './src/shared/validators' -- -i '*spec.ts' -b && 
npm run cti create './src/shared/utils' -- -i '*spec.ts' -b && 
npm run cti create './src/shared/usecases' -- -i '*spec.ts' -b && 

npm run cti create './src/client/application' -- -i '*spec.ts' -b && 
npm run cti create './src/client/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/client/infra' -- -i '*spec.ts' -b