import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, Typography, IconButton } from '@mui/material';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const SearchEmailComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const dummyEmailData = [
        { subject: 'Meeting Reminder', description: 'Reminder for the upcoming meeting on Monday.', date: '2023-12-01' },
        { subject: 'Sale Promotion', description: 'Check out the latest sales offers available this summer.', date: '2024-01-20' },
        { subject: 'Subscription Confirmation', description: 'Your subscription has been confirmed.', date: '2023-10-15' }
    ];

    const handleSearch = () => {
        const filteredResults = dummyEmailData.filter(email => 
            (email.subject.toLowerCase().includes(searchTerm.toLowerCase()) || email.description.toLowerCase().includes(searchThread.toLowerCase())) &&
            email.date.includes(selectedDate.toISOString().split('T')[0])
        );
        setResults(filteredResults);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDelete = (index) => {
        setResults(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'background.default' }}>
                <TextField
                    label='Search Emails'
                    variant='outlined'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1 }}
                />
                <DesktopDatePicker
                    label="Date picker"
                    inputFormat="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} sx={{ width: 160, ml: 2 }} />}
                />
                <Button
                    variant='contained'
                    sx={{ ml: 2 }}
                    onClick={handleSearch}
                >
                    <FaSearch />
                </Button>
            </Box>
            {results && results.length > 0 ? (
                <List sx={{ width: '100%', bgcolor: '#f7f7f7' }}>
                    {results.map((result, index) => (
                        <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', '&:hover': { bgcolor: '#e0e0e0' } }}>
                            <Box>
                                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{result.subject}</Typography>
                                <Typography variant='body2'>{result.description}</Typography>
                            </Box>
                            <IconButton onClick={() => handleDelete(index)} aria-label='delete'>
                                <FaTrash />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography sx={{ mt: 2 }}>No results found.</Typography>
            )}
        </LocalizationProvider>
    );
};

export default SearchEmailComponent;