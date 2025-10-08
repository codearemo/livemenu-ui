#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate component in consuming project
 * This script can be run from projects that have livemenu-ui installed
 * Usage: npx livemenu-generate ComponentName
 */

// Detect if running from node_modules or from library itself
function getProjectRoot() {
  // If running from node_modules, use the consuming project's root
  if (__dirname.includes('node_modules')) {
    // Go up from node_modules/@codearemo/livemenu-ui/bin to project root
    return path.resolve(__dirname, '../../../..');
  }
  // If running from library itself, use current directory
  return process.cwd();
}

const projectRoot = getProjectRoot();

function generateModuleStructure(moduleName) {
  const modulePath = path.join(projectRoot, 'src', 'modules', moduleName);
  
  // Check if module already exists
  if (fs.existsSync(modulePath)) {
    console.error(`❌ Error: Module '${moduleName}' already exists at ${modulePath}`);
    process.exit(1);
  }
  
  // Define the folder structure
  const structure = {
    'data': {
      [`${moduleName}-repo-impl.ts`]: generateRemoteRepoImpl(moduleName),
      'local': {
        [`${moduleName}-local-datasource-impl.ts`]: generateLocalDataSourceImpl(moduleName),
        [`${moduleName}-local-datasource.ts`]: generateLocalDataSource(moduleName)
      },
      'remote': {
        [`${moduleName}-remote-datasource-impl.ts`]: generateRemoteDataSourceImpl(moduleName),
        [`${moduleName}-remote-datasource.ts`]: generateRemoteDataSource(moduleName)
      }
    },
    'domain': {
      [`${moduleName}-repo.ts`]: generateRepo(moduleName),
      'entities': {
        'models': {},
        'params': {}
      },
      'usecases': {
        [`${moduleName}-usecases.ts`]: generateUsecases(moduleName)
      }
    },
    'presentation': {
      'components': {},
      'hooks': {
        [`use${toPascalCase(moduleName)}.ts`]: generateHook(moduleName)
      },
      'screens': {},
      'state': {
        [`${moduleName}-slice.ts`]: generateSlice(moduleName)
      }
    }
  };

  // Create the directory structure
  createDirectoryStructure(modulePath, structure);
  
  console.log(`✅ Module '${moduleName}' generated successfully!`);
  console.log(`📁 Location: src/modules/${moduleName}`);
  console.log(`\n📋 Generated files:`);
  console.log(`   - data/${moduleName}-repo-impl.ts`);
  console.log(`   - data/local/${moduleName}-local-datasource-impl.ts`);
  console.log(`   - data/local/${moduleName}-local-datasource.ts`);
  console.log(`   - data/remote/${moduleName}-remote-datasource-impl.ts`);
  console.log(`   - data/remote/${moduleName}-remote-datasource.ts`);
  console.log(`   - domain/${moduleName}-repo.ts`);
  console.log(`   - domain/usecases/${moduleName}-usecases.ts`);
  console.log(`   - presentation/hooks/use${toPascalCase(moduleName)}.ts`);
  console.log(`   - presentation/state/${moduleName}-slice.ts`);
  console.log(`\n📁 Empty directories:`);
  console.log(`   - domain/entities/models/`);
  console.log(`   - domain/entities/params/`);
  console.log(`   - presentation/components/`);
  console.log(`   - presentation/screens/`);
  console.log(`\n⚠️  Next steps:`);
  console.log(`   1. Add your models in domain/entities/models/`);
  console.log(`   2. Add your params in domain/entities/params/`);
  console.log(`   3. Implement your components in presentation/components/`);
  console.log(`   4. Add your screens in presentation/screens/`);
  console.log(`   5. Implement the data sources and repository`);
  console.log(`   6. Use the hook: import { use${toPascalCase(moduleName)} } from './modules/${moduleName}'`);
}

function createDirectoryStructure(basePath, structure) {
  for (const [name, content] of Object.entries(structure)) {
    const currentPath = path.join(basePath, name);
    
    if (typeof content === 'string') {
      // It's a file content
      fs.writeFileSync(currentPath, content);
    } else if (typeof content === 'object' && content !== null) {
      // It's a directory
      fs.mkdirSync(currentPath, { recursive: true });
      createDirectoryStructure(currentPath, content);
    }
  }
}

function generateRemoteDataSource(moduleName) {
  const className = toPascalCase(moduleName);
  return `export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export abstract class ${className}RemoteDataSource {
  // Add your remote data source methods here
  // Example:
  // abstract getData(): Promise<ApiResponse<unknown>>;
}
`;
}

function generateRemoteDataSourceImpl(moduleName) {
  const className = toPascalCase(moduleName);
  return `import { ApiResponse } from "./${moduleName}-remote-datasource";

export class ${className}RemoteDataSourceImpl implements ${className}RemoteDataSource {
  // Implement your remote data source methods here
  // Example:
  // async getData(): Promise<ApiResponse<unknown>> {
  //   // API call implementation here
  //   throw new Error("Method not implemented.");
  // }
}
`;
}

function generateRemoteRepoImpl(moduleName) {
  const className = toPascalCase(moduleName);
  return `import { ${className}Repo } from "../domain/${moduleName}-repo";
import { ${className}RemoteDataSourceImpl } from "./remote/${moduleName}-remote-datasource-impl";
import { ${className}LocalDataSourceImpl } from "./local/${moduleName}-local-datasource-impl";

export class ${className}RepoImpl implements ${className}Repo {
  private readonly remoteDatasource = new ${className}RemoteDataSourceImpl();
  private readonly localDatasource = new ${className}LocalDataSourceImpl();

  // Implement your repository methods here
  // Example:
  // async getData(): Promise<unknown> {
  //   try {
  //     // Try local first, then remote
  //     const localData = await this.localDatasource.getCachedData();
  //     if (localData) return localData;
  //     
  //     const remoteData = await this.remoteDatasource.getData();
  //     await this.localDatasource.setCachedData(remoteData);
  //     return remoteData;
  //   } catch (error) {
  //     console.error('Failed to get data:', error);
  //     throw error;
  //   }
  // }
}
`;
}

function generateRepo(moduleName) {
  const className = toPascalCase(moduleName);
  return `export abstract class ${className}Repo {
  // Add your repository methods here
  // Example:
  // abstract getData(): Promise<unknown>;
}
`;
}

function generateUsecases(moduleName) {
  const className = toPascalCase(moduleName);
  return `import { ${className}RepoImpl } from "../../data/${moduleName}-repo-impl";

export class ${className}Usecases {
  private readonly repo = new ${className}RepoImpl();

  // Add your use case methods here
  // Example:
  // async executeGetData(): Promise<unknown> {
  //   // Validate input parameters
  //   // this.validateGetDataParams();
  //   
  //   return this.repo.getData();
  // }

  // Add private validation methods here
  // Example:
  // private validateGetDataParams(): void {
  //   // Validation logic here
  // }
}
`;
}

function generateLocalDataSource(moduleName) {
  const className = toPascalCase(moduleName);
  return `export abstract class ${className}LocalDataSource {
  // Add your local data source methods here
  // Example:
  // abstract getCachedData(): Promise<unknown | null>;
  // abstract setCachedData(data: unknown): Promise<void>;
  // abstract clearCachedData(): Promise<void>;
}
`;
}

function generateLocalDataSourceImpl(moduleName) {
  const className = toPascalCase(moduleName);
  return `export class ${className}LocalDataSourceImpl implements ${className}LocalDataSource {
  // Implement your local data source methods here
  // Example using localStorage (or AsyncStorage for React Native):
  // async getCachedData(): Promise<unknown | null> {
  //   try {
  //     const data = localStorage.getItem('${moduleName}_cache');
  //     return data ? JSON.parse(data) : null;
  //   } catch (error) {
  //     console.error('Error getting cached data:', error);
  //     return null;
  //   }
  // }

  // async setCachedData(data: unknown): Promise<void> {
  //   try {
  //     localStorage.setItem('${moduleName}_cache', JSON.stringify(data));
  //   } catch (error) {
  //     console.error('Error setting cached data:', error);
  //     throw error;
  //   }
  // }

  // async clearCachedData(): Promise<void> {
  //   try {
  //     localStorage.removeItem('${moduleName}_cache');
  //   } catch (error) {
  //     console.error('Error clearing cached data:', error);
  //     throw error;
  //   }
  // }
}
`;
}

function generateSlice(moduleName) {
  const className = toPascalCase(moduleName);
  return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ${className}State {
  // Add your state properties here
  // Example:
  // data: unknown[] | null;
  // loading: boolean;
  // error: string | null;
}

const initialState: ${className}State = {
  // Initialize your state here
  // Example:
  // data: null,
  // loading: false,
  // error: null,
};

const ${moduleName}Slice = createSlice({
  name: '${moduleName}',
  initialState,
  reducers: {
    // Add your reducers here
    // Example:
    // setData: (state, action: PayloadAction<unknown[]>) => {
    //   state.data = action.payload;
    // },
    // setLoading: (state, action: PayloadAction<boolean>) => {
    //   state.loading = action.payload;
    // },
    // setError: (state, action: PayloadAction<string | null>) => {
    //   state.error = action.payload;
    // },
  },
});

export const { /* Add your action creators here */ } = ${moduleName}Slice.actions;
export default ${moduleName}Slice.reducer;
`;
}

function generateHook(moduleName) {
  const className = toPascalCase(moduleName);
  return `import { useCallback } from 'react';
import { ${className}Usecases } from "../../domain/usecases/${moduleName}-usecases";

const use${className} = () => {
  const usecase = new ${className}Usecases();

  // Add your hook methods here
  // Example:
  // const getData = useCallback(async () => {
  //   try {
  //     const response = await usecase.executeGetData();
  //     return response;
  //   } catch (error) {
  //     console.error('Error in use${className}:', error);
  //     throw error;
  //   }
  // }, []);

  return {
    // Export your hook methods
    // getData,
  };
};

export default use${className};
`;
}

// Utility to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Error: Module name is required');
    console.log('\n📖 Usage: npx livemenu-generate <ModuleName>');
    console.log('\n📚 Examples:');
    console.log('   npx livemenu-generate restaurants');
    console.log('   npx livemenu-generate user-profile  (converts to UserProfile)');
    console.log('   npx livemenu-generate orders');
    console.log('\n💡 This will create a module in: src/modules/<ModuleName>/');
    console.log('\n🏗️  The module follows Clean Architecture with:');
    console.log('   - data/ (repository, data sources)');
    console.log('   - domain/ (entities, use cases)');
    console.log('   - presentation/ (components, hooks, state)');
    process.exit(1);
  }

  let moduleName = args[0];
  
  // Convert to PascalCase if kebab-case is provided
  if (moduleName.includes('-')) {
    moduleName = toPascalCase(moduleName);
    console.log(`📝 Converting to PascalCase: ${moduleName}`);
  }
  
  // Validate module name (PascalCase)
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(moduleName)) {
    console.error('❌ Error: Module name must be in PascalCase (e.g., Restaurants, UserProfile)');
    process.exit(1);
  }

  console.log(`📦 Generating module in: ${projectRoot}`);
  
  try {
    generateModuleStructure(moduleName);
  } catch (error) {
    console.error('❌ Error generating module:', error.message);
    process.exit(1);
  }
}

main();

export { generateModuleStructure, toPascalCase };
