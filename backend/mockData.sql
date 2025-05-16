-- Subject data
INSERT INTO Subject (IdSubject, description, createdAt, updatedAt) VALUES
('S001', 'Describe your favorite hobby.', '2025-05-01 09:00:00', '2025-05-01 09:15:00'),
('S002', 'Talk about a memorable trip.', '2025-05-02 10:30:00', '2025-05-02 11:00:00'),
('S003', 'Explain a technical concept you enjoy.', '2025-05-03 14:20:00', '2025-05-03 14:45:00'),
('S004', 'Describe your morning routine.', '2025-05-04 08:10:00', '2025-05-04 08:40:00'),
('S005', 'What is your dream job?', '2025-05-05 16:00:00', '2025-05-05 16:20:00');

-- Answer data
INSERT INTO Answer (idAnswer, file_location, answer_time, review, IdSubject, createdAt, updatedAt) VALUES
('A001', 'sound.mp3', '00:01:12', 'Clear and well-paced.', 'S001', '2025-05-01 09:05:00', '2025-05-01 09:10:00'),
('A002', 'sound.mp3', '00:00:45', 'Too fast but understandable.', 'S001', '2025-05-01 09:20:00', '2025-05-01 09:25:00'),
('A003', 'sound.mp3', '00:01:30', 'Good pronunciation.', 'S002', '2025-05-02 11:05:00', '2025-05-02 11:10:00'),
('A004', 'sound.mp3', '00:02:00', 'Could be more detailed.', 'S003', '2025-05-03 15:00:00', '2025-05-03 15:10:00'),
('A005', 'sound.mp3', '00:00:50', 'Excellent articulation.', 'S004', '2025-05-04 08:45:00', '2025-05-04 08:50:00'),
('A006', 'sound.mp3', '00:01:15', 'Needs improvement in clarity.', 'S005', '2025-05-05 16:30:00', '2025-05-05 16:35:00');

-- Comment data
INSERT INTO Comment (idComment, time_signature, review, idAnswer, createdAt, updatedAt) VALUES
('C001', '00:00:15', 'Mispronunciation here.', 'A001', '2025-05-01 09:06:00', '2025-05-01 09:07:00'),
('C002', '00:00:30', 'Repeat this phrase.', 'A001', '2025-05-01 09:08:00', '2025-05-01 09:09:00'),
('C003', '00:00:10', 'Great tone.', 'A003', '2025-05-02 11:06:00', '2025-05-02 11:06:30'),
('C004', '00:00:45', 'Inaudible word.', 'A004', '2025-05-03 15:05:00', '2025-05-03 15:06:00'),
('C005', '00:00:25', 'Very natural.', 'A005', '2025-05-04 08:46:00', '2025-05-04 08:47:00'),
('C006', '00:00:05', 'Try to slow down.', 'A002', '2025-05-01 09:21:00', '2025-05-01 09:22:00'),
('C007', '00:00:55', 'Excellent conclusion.', 'A006', '2025-05-05 16:31:00', '2025-05-05 16:32:00');

