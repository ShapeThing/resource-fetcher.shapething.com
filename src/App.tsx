import { useCallback, useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import FetchDisplay from "./FetchDisplay"
import { CloseAllContext } from "./CloseAllContext"
import "./App.css"

const queryClient = new QueryClient()
const testNames = Object.keys(import.meta.glob('../public/**/iri.txt')).map(path => path.split('/')[2])

export default function App() {
  const [closeSignal, setCloseSignal] = useState(0)
  const closeAll = useCallback(() => setCloseSignal(n => n + 1), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && !document.querySelector('dialog[open]')) closeAll() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeAll])

  return (
    <QueryClientProvider client={queryClient}>
      <CloseAllContext.Provider value={closeSignal}>
      <div className="app">
        <header className="app-header">
          <img
            src="logo.svg"
            alt="ShapeThing logo"
            className="logo"
          />
          <h1>Resource Fetcher</h1>
        </header>
        <p className="description">
          A SHACL-guided RDF resource fetcher that retrieves all triples belonging to a
          specific IRI from RDF data sources, handling the complexities of blank nodes and
          nested data structures. It follows the concept of the Concise Bounded Description
          (CBD) and extends it with SHACL.
        </p>
        <section className="test-section">
          <h2>Examples</h2>
          <div className="test-list">
            {testNames.map(name => (
              <FetchDisplay key={name} name={name} />
            ))}
          </div>
        </section>
      </div>
      </CloseAllContext.Provider>
    </QueryClientProvider>
  )
}