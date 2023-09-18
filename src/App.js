import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/layouts/Landing';

export default function App() {
  return (

    <Router
      exact
      path="/"
    >
      <Routes>
        <Route index exact path="/" element={<Landing />} />
      </Routes>
    </Router>
  )
}
