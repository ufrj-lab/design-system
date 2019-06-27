/* eslint-disable no-unused-vars */
export function toCapitalizer(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`
}
export function getModuleNamesFromPackageName(pkgName, strategy) {
  const genClassName = nameString => {
    const nameArray = nameString.split('-')

    const [_, folder] = nameArray
    const className = nameArray.map(part => toCapitalizer(part)).join('')

    return {
      className,
      folder: `${folder}/demo`,
    }
  }

  const isUfrj = pkgName.includes('@ufrj/')
  const isDemo = strategy === 'demo'
  if (!isUfrj || isDemo)
    return {
      isUfrj,
      pkgName,
    }

  const slugName = pkgName.replace('@ufrj/', '')

  const { className, folder } = genClassName(slugName)

  const moduleName = className

  return {
    isUfrj,
    pkgName,
    slugName,
    className,
    folder,
    moduleName,
  }
}

export function resolveDependenciesBuild(dependencies, strategy) {
  return Object.keys(dependencies).map(name =>
    getModuleNamesFromPackageName(name, strategy),
  )
}

export function publicReplaceESModulesPackageNames(
  dependencies,
  pkgsExternal = [],
  strategy = 'browser',
  dependenciesPath = './',
) {
  const external = []
  let replace

  const resolvedDependencies = resolveDependenciesBuild(dependencies, strategy)
  resolvedDependencies.forEach(dependence => {
    const { isUfrj, pkgName, moduleName } = dependence
    if (pkgsExternal.includes(pkgName)) {
      external.push(pkgName)
      return
    }

    if (isUfrj) {
      if (moduleName) {
        if (!replace) {
          replace = {
            delimiters: ['', ''],
          }
        }
        const file = `${dependenciesPath}${moduleName}.js`
        external.push(file)
        replace = {
          ...replace,
          [`${pkgName}/lib/${moduleName}`]: file,
          [pkgName]: file,
        }
        return
      }
      external.push(pkgName)
    }
  })

  const result = {
    external,
    replace,
  }

  return result
}
