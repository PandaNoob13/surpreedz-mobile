import  { useContext } from 'react'
import { DependencyContext } from '../context/DependencyContext'

const useDependency = () => {
  return useContext(DependencyContext)
}

export default useDependency;