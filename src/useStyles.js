import React, { createContext, useContext, useMemo, forwardRef } from 'react'
import useSubstyle, { createSubstyle } from 'substyle'

// Context for props decorator (replaces the old contextTypes pattern)
const PropsDecoratorContext = createContext(null)

export { PropsDecoratorContext }

/**
 * Hook to get styles for a component
 * @param {Object} defaultStyle - The default styles for the component
 * @param {Object} props - The component props containing style, className, classNames
 * @param {Object|Function} modifiers - Optional modifiers for conditional styles
 * @returns {Function} - The substyle function for selecting element styles
 */
export function useStyles(defaultStyle, props, modifiers) {
  const { style, className, classNames } = props
  const propsDecorator = useContext(PropsDecoratorContext)
  
  return useMemo(() => {
    const substyle = createSubstyle(
      { style, className, classNames },
      propsDecorator || undefined
    )
    return substyle(modifiers, defaultStyle)
  }, [style, className, classNames, propsDecorator, modifiers, defaultStyle])
}

/**
 * HOC that provides styling capabilities using the modern Context API
 * This replaces the old `defaultStyle` HOC from substyle v6
 * 
 * @param {Object|Function} defaultStyle - Default styles or function returning default styles
 * @param {Function} getModifiers - Optional function to compute style modifiers from props
 * @returns {Function} - HOC function
 */
export function defaultStyle(defaultStyle, getModifiers) {
  return function withDefaultStyle(WrappedComponent) {
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component'
    
    const WithDefaultStyle = forwardRef((props, ref) => {
      const { style, className, classNames, ...rest } = props
      
      // Compute modifiers if getModifiers function is provided
      const modifiers = getModifiers ? getModifiers(rest) : undefined
      
      // Compute default style if it's a function
      const computedDefaultStyle = typeof defaultStyle === 'function' 
        ? defaultStyle(rest) 
        : defaultStyle
      
      // Get props decorator from context (if any)
      const propsDecorator = useContext(PropsDecoratorContext)
      
      // Create substyle instance
      const substyle = useMemo(() => {
        const base = createSubstyle(
          { style, className, classNames },
          propsDecorator || undefined
        )
        return base(modifiers, computedDefaultStyle)
      }, [style, className, classNames, propsDecorator, modifiers, computedDefaultStyle])
      
      return <WrappedComponent ref={ref} {...rest} style={substyle} />
    })
    
    WithDefaultStyle.displayName = `withDefaultStyle(${wrappedComponentName})`
    
    // Copy static properties
    if (WrappedComponent.propTypes) {
      WithDefaultStyle.propTypes = { ...WrappedComponent.propTypes }
    }
    if (WrappedComponent.defaultProps) {
      WithDefaultStyle.defaultProps = { ...WrappedComponent.defaultProps }
    }
    
    // Expose WrappedComponent for testing
    WithDefaultStyle.WrappedComponent = WrappedComponent
    
    return WithDefaultStyle
  }
}

export default useSubstyle
