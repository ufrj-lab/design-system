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
  haveStyles,
  name,
  dependencies,
  pkgsExternal = [],
  strategy = 'browser',
  dependenciesPath = './',
) {
  const externals = []
  let replaces
  const { isUfrj, className } = getModuleNamesFromPackageName(name)

  if (haveStyles) {
    if (isUfrj) {
      const styles = `./${className}.styles.js`
      externals.push(styles)
      if (!replaces) {
        replaces = {
          delimiters: ['', ''],
        }
      }
      replaces = {
        ...replaces,
        './styles': styles,
      }
    }
  }

  const resolvedDependencies = resolveDependenciesBuild(dependencies, strategy)
  resolvedDependencies.forEach(dependence => {
    const { isUfrj, pkgName, moduleName } = dependence
    if (pkgsExternal.includes(pkgName)) {
      externals.push(pkgName)
      return
    }

    if (isUfrj) {
      if (moduleName) {
        const file = `${dependenciesPath}${moduleName}.js`
        externals.push(file)
        if (!replaces) {
          replaces = {
            delimiters: ['', ''],
          }
        }
        replaces = {
          ...replaces,
          [`${pkgName}/lib/${moduleName}`]: file,
          [pkgName]: file,
        }
        return
      }
      externals.push(pkgName)
    }
  })

  const result = {
    externals,
    replaces,
    fileName: className,
  }

  return result
}
