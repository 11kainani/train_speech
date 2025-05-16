-- Subject data
INSERT INTO Subject (IdSubject, description, createdAt, updatedAt) VALUES
('S001', 'Describe your favorite hobby.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('S002', 'Talk about a memorable trip.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('S003', 'Explain a technical concept you enjoy.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('S004', 'Describe your morning routine.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('S005', 'What is your dream job?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Answer data
INSERT INTO Answer (idAnswer, file_location, duration, review, IdSubject, createdAt, updatedAt) VALUES
('A001', 'sound.mp3', '00:01:12', 'Clear and well-paced.', 'S001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('A002', 'sound.mp3', '00:00:45', 'Too fast but understandable.', 'S001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('A003', 'sound.mp3', '00:01:30', 'Good pronunciation.', 'S002', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('A004', 'sound.mp3', '00:02:00', 'Could be more detailed.', 'S003', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('A005', 'sound.mp3', '00:00:50', 'Excellent articulation.', 'S004', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('A006', 'sound.mp3', '00:01:15', 'Needs improvement in clarity.', 'S005', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Comment data
INSERT INTO Comment (idComment, time_signature, review, idAnswer, createdAt, updatedAt) VALUES
('C001', '00:00:15', 'Mispronunciation here.', 'A001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('C002', '00:00:30', 'Repeat this phrase.', 'A001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('C003', '00:00:10', 'Great tone.', 'A003', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('C004', '00:00:45', 'Inaudible word.', 'A004', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('C005', '00:00:25', 'Very natural.', 'A005', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('C006', '00:00:05', 'Try to slow down.', 'A002', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('C007', '00:00:55', 'Excellent conclusion.', 'A006', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
