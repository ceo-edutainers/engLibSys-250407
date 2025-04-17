'use client'

import React, { useEffect, useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
// import './css/ScrambledSentenceGame.css' // ← 스타일 불러오기

const SortableWord = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="word-box"
    >
      {id}
    </div>
  )
}

const ScrambledSentenceGame = () => {
  const [sentence, setSentence] = useState('I want to eat a hamburger')
  const [words, setWords] = useState([])
  const [orderedWords, setOrderedWords] = useState([])
  const [isCorrect, setIsCorrect] = useState(null)

  useEffect(() => {
    const original = sentence.split(' ')
    const shuffled = [...original].sort(() => Math.random() - 0.5)
    setWords(original)
    setOrderedWords(shuffled)
  }, [sentence])

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = orderedWords.indexOf(active.id)
      const newIndex = orderedWords.indexOf(over.id)
      const newArray = arrayMove(orderedWords, oldIndex, newIndex)
      setOrderedWords(newArray)
    }
  }

  const checkAnswer = () => {
    const correct = JSON.stringify(words) === JSON.stringify(orderedWords)
    setIsCorrect(correct)
  }

  return (
    <div className="game-container">
      <h2 className="title">Arrange the words to form the correct sentence:</h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={orderedWords} strategy={rectSortingStrategy}>
          <div className="word-container">
            {orderedWords.map((word) => (
              <SortableWord key={word} id={word} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button onClick={checkAnswer} className="check-btn">
        Check
      </button>

      {isCorrect !== null && (
        <p className={`result ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect ? 'Correct!' : 'Try again!'}
        </p>
      )}
    </div>
  )
}

export default ScrambledSentenceGame
