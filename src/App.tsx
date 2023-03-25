import { Stack, Form, Button, Alert, Nav, Navbar, Container, NavDropdown, Offcanvas } from "react-bootstrap"
import { useState, useEffect, useRef } from 'react'

export default function App() {
	const [searchTerm, setSearchTerm] = useState<string>('');
  const [definition, setDefinition] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
      const data = await response.json();
      setDefinition(data[0].meanings[0].definitions[0].definition);
      setError(null);
    } catch (err) {
      setDefinition(null);
      setError(`Sorry, we couldn't find a definition for "${searchTerm}"`);
    }
  }

  return (
    <div className="container">
      <h1 className="text-center mb-5">Dictionary</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="border rounded p-3 mb-5" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="searchTerm">Enter a word:</label>
              <div className="input-group">
                <input
                  className="form-control"
                  id="searchTerm"
                  type="text"
                  placeholder="e.g. apple"
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">Search</button>
                </div>
              </div>
            </div>
          </form>
          {definition && (
            <div className="border rounded p-3 mb-5">
              <p className="text-muted">{definition}</p>
            </div>
          )}
          {error && (
            <div className="border rounded p-3 mb-5">
              <p className="text-danger">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}