import React, { useState, useRef } from 'react';

function EventHandlersAndUseRef() {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);
    const inputRefs = useRef([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddClick = () => {
        if (inputValue.trim() !== '') {
            setItems([...items, inputValue]);
            setInputValue('');
        }
    };

    const handleUpdateClick = (index) => {
        const newItemValue = inputRefs.current[index].value.trim();
        if (newItemValue !== '') {
            const updatedItems = [...items];
            updatedItems[index] = newItemValue;
            setItems(updatedItems);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleAddClick} disabled={!inputValue.trim()}>
                Добавить
            </button>
            {items.length === 0 && <p>Список пуст</p>}
            {items.map((item, index) => (
                <div key={index}>
                    <span>{item}</span>
                    <input type="text" ref={(el) => (inputRefs.current[index] = el)} defaultValue={item} />
                    <button onClick={() => handleUpdateClick(index)} disabled={!inputRefs.current[index] || inputRefs.current[index].value.trim() === ''}>
                        Поменять
                    </button>
                </div>
            ))}
        </div>
    );
}

export default EventHandlersAndUseRef;
