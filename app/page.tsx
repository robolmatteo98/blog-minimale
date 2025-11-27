"use client";

import { useState, useEffect } from "react";
import notesData from "../data/notes.json"; // JSON iniziale

interface Note {
  id: number;
  text: string;
  color: string;
  imageUrl?: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newImage, setNewImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const NOTES_PER_PAGE = 1; // Puoi cambiare se vuoi più note per pagina
  const MAX_CHARS = 280;

  const COLORS = [
    "bg-blue-100 dark:bg-blue-900",
    "bg-green-100 dark:bg-green-900",
    "bg-purple-100 dark:bg-purple-900",
    "bg-pink-100 dark:bg-pink-900",
    "bg-yellow-100 dark:bg-yellow-900",
    "bg-orange-100 dark:bg-orange-900",
  ];

  // Carica note iniziali da JSON
  useEffect(() => {
    setNotes(notesData);
  }, []);

  const addNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now(),
      text: newNote.trim(),
      color: COLORS[notes.length % COLORS.length],
      imageUrl: newImage.trim() || undefined,
    };

    setNotes([note, ...notes]);
    setNewNote("");
    setNewImage("");
    setShowForm(false);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE);
  const paginatedNotes = notes.slice(
    (currentPage - 1) * NOTES_PER_PAGE,
    currentPage * NOTES_PER_PAGE
  );

  const charsLeft = MAX_CHARS - newNote.length;

  return (
    <div className="min-h-screen w-full bg-zinc-100 dark:bg-neutral-900 font-sans flex justify-center px-4 py-10">
      <main className="w-full max-w-4xl flex flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col items-start gap-3">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Il blog più bello di tutti
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl">
            Un posto semplice e colorato per aggiungere note con testo e immagini.
          </p>
        </header>

        {/* Contenuto */}
        <section className="bg-white dark:bg-neutral-800 shadow-lg rounded-2xl p-8 transition-all min-h-[300px]">
          {(
            <>
              {/* Lista note */}
              {notes.length === 0 ? (
                <div className="text-center text-zinc-500 dark:text-zinc-300 text-lg">
                  Nessuna nota ancora. Inizia aggiungendone una!
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {paginatedNotes.map((note) => (
                    <div
                      key={note.id}
                      className={`p-4 rounded-xl shadow-sm ${note.color} text-zinc-900 dark:text-zinc-100 flex flex-col gap-3`}
                    >
                      <div>{note.text}</div>
                      {note.imageUrl && (
                        <img
                          src={note.imageUrl}
                          alt="Nota immagine"
                          className="rounded-lg max-h-64 object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {notes.length > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === 1
                        ? "bg-zinc-300 dark:bg-neutral-700 text-zinc-500 cursor-not-allowed"
                        : "bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white"
                    }`}
                  >
                    ← Precedente
                  </button>

                  <span className="text-zinc-600 dark:text-zinc-300">
                    Pagina {currentPage} di {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === totalPages
                        ? "bg-zinc-300 dark:bg-neutral-700 text-zinc-500 cursor-not-allowed"
                        : "bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white"
                    }`}
                  >
                    Successiva →
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Pulsante per aprire form */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all text-xl"
          >
            Aggiungi nota
          </button>
        </div>
      </main>
    </div>
  );
}