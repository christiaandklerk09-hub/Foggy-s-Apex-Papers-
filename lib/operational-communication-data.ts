import { QuizPaper } from './quiz-data';

export const OPERATIONAL_COMMUNICATION_PAPER: QuizPaper = {
  id: 'operational-communication',
  title: 'SAFEHARBOR OPERATIONS',
  subtitle: 'Communications & Visual Signaling',
  code: 'Assessment',
  chapterNumber: 2,
  totalMarks: 70,
  passMark: 56, // 80% pass mark for 70 questions
  description: 'Official Apex Papers Operations Assessment covering waterfront safety signs, warning flags, hand and audible signals, two-way radio procedures, prowords, and radio maintenance/water-damage protocols.',
  questions: [
    {
      id: 1,
      category: 'Safety Signs & Rules',
      question: 'What is the primary purpose of safety signs at a waterfront?',
      options: [
        { letter: 'A', text: 'To decorate the facility' },
        { letter: 'B', text: 'To inform users about supervision, rules, and hazards' },
        { letter: 'C', text: 'To restrict access to certain areas' },
        { letter: 'D', text: 'To mark the lifeguard stations' }
      ],
      correctAnswer: 'B',
      explanation: 'Safety signs at aquatic facilities primarily inform patrons and users about supervision requirements, facility rules, and potential hazards to prevent accidents.'
    },
    {
      id: 2,
      category: 'Safety Signs & Rules',
      question: 'what color background indicates a warning or caution sign?',
      options: [
        { letter: 'A', text: 'Red' },
        { letter: 'B', text: 'Green' },
        { letter: 'C', text: 'Yellow' },
        { letter: 'D', text: 'Blue' }
      ],
      correctAnswer: 'C',
      explanation: 'Yellow backgrounds are universally standardized for warning and caution signs, alerting patrons to potential hazards.'
    },
    {
      id: 3,
      category: 'Safety Signs & Rules',
      question: 'Which color slash on a sign indicates that an activity is prohibited?',
      options: [
        { letter: 'A', text: 'Red slash' },
        { letter: 'B', text: 'Yellow slash' },
        { letter: 'C', text: 'Green slash' },
        { letter: 'D', text: 'White slash' }
      ],
      correctAnswer: 'A',
      explanation: 'A red circle with a red diagonal slash over a symbol indicates that the depicted activity or behavior is strictly prohibited.'
    },
    {
      id: 4,
      category: 'Safety Signs & Rules',
      question: 'What does a green border on a safety sign indicate?',
      options: [
        { letter: 'A', text: 'Danger ahead' },
        { letter: 'B', text: 'Activity is permitted' },
        { letter: 'C', text: 'Caution required' },
        { letter: 'D', text: 'Area is closed' }
      ],
      correctAnswer: 'B',
      explanation: 'Green borders or green informational panels indicate safety guidance, first aid locations, or permitted activities.'
    },
    {
      id: 5,
      category: 'Safety Signs & Rules',
      question: 'What should facility safety rules signs typically include?',
      options: [
        { letter: 'A', text: 'Only swimming instructions' },
        { letter: 'B', text: 'Minimum age and supervision requirements for children' },
        { letter: 'C', text: 'Emergency contact numbers only' },
        { letter: 'D', text: 'Lifeguard schedules' }
      ],
      correctAnswer: 'B',
      explanation: 'Safety rules signs must outline minimum age restrictions and adult supervision requirements for children visiting the facility.'
    },
    {
      id: 6,
      category: 'Safety Signs & Rules',
      question: 'what is the recommended minimum water temperature for young children at a facility?',
      options: [
        { letter: 'A', text: 'No specific recommendation' },
        { letter: 'B', text: 'Should be stated on facility safety rules signs' },
        { letter: 'C', text: 'Must be posted as required by facility safety rules' },
        { letter: 'D', text: 'standard protocol does not specify this' }
      ],
      correctAnswer: 'C',
      explanation: 'Water temperature standards and guidelines for young children must be posted as required by facility safety rules.'
    },
    {
      id: 7,
      category: 'Safety Signs & Rules',
      question: 'What should be posted near recreational equipment such as waterslides or diving boards?',
      options: [
        { letter: 'A', text: 'General facility rules' },
        { letter: 'B', text: 'Specific rules and restrictions for safe use of each item' },
        { letter: 'C', text: 'Lifeguard contact information' },
        { letter: 'D', text: 'Emergency procedures only' }
      ],
      correctAnswer: 'B',
      explanation: 'Specific operational rules and safety restrictions for each recreational item (waterslides, diving boards) must be posted nearby.'
    },
    {
      id: 8,
      category: 'Warning Flags',
      question: 'What does the Yellow Flag with a Black Ball in the middle signify?',
      options: [
        { letter: 'A', text: 'Immediate danger in the water' },
        { letter: 'B', text: 'Swimming is permitted within 200m on either side of the display point' },
        { letter: 'C', text: 'No swimming allowed' },
        { letter: 'D', text: 'Lifeguard on duty' }
      ],
      correctAnswer: 'B',
      explanation: 'A yellow flag with a black ball designates a specialized surfing/swimming zone where swimming is permitted within 200m on either side.'
    },
    {
      id: 9,
      category: 'Warning Flags',
      question: 'When should a Red Flag be flown at a beach or water facility?',
      options: [
        { letter: 'A', text: 'At the start of each duty day' },
        { letter: 'B', text: 'When swimming is temporarily unsafe' },
        { letter: 'C', text: 'During training exercises' },
        { letter: 'D', text: 'Every day at sunset' }
      ],
      correctAnswer: 'B',
      explanation: 'A red flag is flown to warn the public that swimming or entering the water is temporarily unsafe due to hazardous conditions.'
    },
    {
      id: 10,
      category: 'Warning Flags',
      question: 'What does the Red and Yellow Flag indicate?',
      options: [
        { letter: 'A', text: 'Danger - do not enter' },
        { letter: 'B', text: 'Areas where lifeguards are patrolling' },
        { letter: 'C', text: 'Swimming area boundaries' },
        { letter: 'D', text: 'Rip current warning' }
      ],
      correctAnswer: 'B',
      explanation: 'Red and yellow quartered flags indicate the designated safe swimming areas monitored and patrolled by active lifeguards.'
    },
    {
      id: 11,
      category: 'Warning Flags',
      question: 'What is the purpose of the Shark Danger Flag?',
      options: [
        { letter: 'A', text: 'To mark shark-infested areas' },
        { letter: 'B', text: 'To alert bathers to potential shark activity' },
        { letter: 'C', text: 'To identify swimming zones' },
        { letter: 'D', text: 'To mark deep water areas' }
      ],
      correctAnswer: 'B',
      explanation: 'The shark danger flag warns bathers and water users of potential shark activity or recent sightings in the vicinity.'
    },
    {
      id: 12,
      category: 'Warning Flags',
      question: 'How should lifeguards use the Apex Papers Operations Signal Flags?',
      options: [
        { letter: 'A', text: 'For general communication with the public' },
        { letter: 'B', text: 'As a pair, only for signals with no meaning for the general public' },
        { letter: 'C', text: 'Individually for different messages' },
        { letter: 'D', text: 'To mark restricted areas' }
      ],
      correctAnswer: 'B',
      explanation: 'Apex Papers Operations Signal Flags are utilized as a pair, specifically for internal operational signals with no direct meaning for the general public.'
    },
    {
      id: 13,
      category: 'Hand & Audible Signals',
      question: 'What is the primary purpose of hand and audible signals in lifeguarding?',
      options: [
        { letter: 'A', text: 'To entertain patrons' },
        { letter: 'B', text: 'To communicate essential information between rescuers and shore patrols' },
        { letter: 'C', text: 'To mark the boundary of swimming areas' },
        { letter: 'D', text: 'To indicate water temperature changes' }
      ],
      correctAnswer: 'B',
      explanation: 'Hand and audible signals provide reliable, rapid communication between rescuers in the water and shore patrols when voice or radio is impractical.'
    },
    {
      id: 14,
      category: 'Hand & Audible Signals',
      question: 'how should lifeguards deliver signals?',
      options: [
        { letter: 'A', text: 'Once and then assume they were understood' },
        { letter: 'B', text: 'Clear and repeated until acknowledged or understood' },
        { letter: 'C', text: 'Only during emergencies' },
        { letter: 'D', text: 'In written form to ensure clarity' }
      ],
      correctAnswer: 'B',
      explanation: 'All signals must be given distinctly and repeated continuously until acknowledged and understood by the receiving party.'
    },
    {
      id: 15,
      category: 'Hand & Audible Signals',
      question: 'What does one arm raised horizontally from a lifeguard in the water signify?',
      options: [
        { letter: 'A', text: 'Assistance required' },
        { letter: 'B', text: 'Distress signal' },
        { letter: 'C', text: 'All clear signal' },
        { letter: 'D', text: 'Call for backup' }
      ],
      correctAnswer: 'A',
      explanation: 'One arm raised horizontally from a lifeguard in the water signifies that assistance is required.'
    },
    {
      id: 16,
      category: 'Hand & Audible Signals',
      question: 'What signal indicates that resuscitation is required?',
      options: [
        { letter: 'A', text: 'Both arms raised above head' },
        { letter: 'B', text: 'One hand waving side to side' },
        { letter: 'C', text: 'Both arms crossed over chest' },
        { letter: 'D', text: 'As per the designated hand signal for resuscitation' }
      ],
      correctAnswer: 'D',
      explanation: 'Resuscitation required is communicated according to the specific designated hand signal specified in standard protocol.'
    },
    {
      id: 17,
      category: 'Hand & Audible Signals',
      question: 'When does a beltman signal "haul in"?',
      options: [
        { letter: 'A', text: 'When the casualty is lost' },
        { letter: 'B', text: 'When the casualty is secured and ready to be pulled in' },
        { letter: 'C', text: 'At the end of each exercise' },
        { letter: 'D', text: 'When the line becomes tangled' }
      ],
      correctAnswer: 'B',
      explanation: 'The beltman signals "haul in" once the casualty is secured and the rescue team is ready to pull them back to shore.'
    },
    {
      id: 18,
      category: 'Hand & Audible Signals',
      question: 'What does the signal "lost casualty, pay out" mean?',
      options: [
        { letter: 'A', text: 'The casualty has escaped' },
        { letter: 'B', text: 'More line is needed because the casualty has drifted further out' },
        { letter: 'C', text: 'The casualty is deceased' },
        { letter: 'D', text: 'The rescue operation is cancelled' }
      ],
      correctAnswer: 'B',
      explanation: '"Pay out" signals that more line must be fed out because the casualty or search swimmer has drifted further out.'
    },
    {
      id: 19,
      category: 'Hand & Audible Signals',
      question: 'What does a helicopter signal "all clear, you may enter" indicate?',
      options: [
        { letter: 'A', text: 'The patient is ready to be lifted' },
        { letter: 'B', text: 'The crew member may proceed with their task' },
        { letter: 'C', text: 'The rescue operation has ended' },
        { letter: 'D', text: 'Another helicopter should arrive' }
      ],
      correctAnswer: 'B',
      explanation: 'Indicates that the rescue crew member or ground personnel may proceed with their assigned task safely.'
    },
    {
      id: 20,
      category: 'Hand & Audible Signals',
      question: 'What should a rescuer signal when the patient is secured and ready for lifting by helicopter?',
      options: [
        { letter: 'A', text: 'All clear' },
        { letter: 'B', text: 'Maintain height and speed' },
        { letter: 'C', text: 'Patient secured, lift' },
        { letter: 'D', text: 'Abort operation' }
      ],
      correctAnswer: 'C',
      explanation: 'The standard rescue signal confirms that the patient is fully secured and ready for the winch/lift operation.'
    },
    {
      id: 21,
      category: 'Pool Signals',
      question: 'What is the correct hand signal for "look at me" or "watch" in pool lifeguarding?',
      options: [
        { letter: 'A', text: 'Pointing to the person' },
        { letter: 'B', text: 'Pointing to eyes with 2 fingers then pointing away' },
        { letter: 'C', text: 'Waving both hands' },
        { letter: 'D', text: 'Raising one arm' }
      ],
      correctAnswer: 'B',
      explanation: 'Pointing to the eyes with two fingers and then pointing in the direction indicated is the standard pool signal for watch/look.'
    },
    {
      id: 22,
      category: 'Pool Signals',
      question: 'How is the chlorine leak signal communicated in a pool?',
      options: [
        { letter: 'A', text: 'Blowing the whistle repeatedly' },
        { letter: 'B', text: 'Cupping hand over mouth with circular motion to indicate area to clear' },
        { letter: 'C', text: 'Raising both arms' },
        { letter: 'D', text: 'Using hand signals to spell the word' }
      ],
      correctAnswer: 'B',
      explanation: 'Cupping the hand over the mouth with a circular motion warns of a chlorine gas leak and indicates the area to clear.'
    },
    {
      id: 23,
      category: 'Pool Signals',
      question: 'What is the pool signal for "time\'s up" or "over"?',
      options: [
        { letter: 'A', text: 'Both arms crossed' },
        { letter: 'B', text: 'Pointing to the clock' },
        { letter: 'C', text: 'Slashing motion across throat with hand' },
        { letter: 'D', text: 'Raising one hand' }
      ],
      correctAnswer: 'C',
      explanation: 'A slashing motion across the throat with the hand signifies "time\'s up" or session over in pool training/operations.'
    },
    {
      id: 24,
      category: 'Pool Signals',
      question: 'What does the signal "cervical spinal injury" look like in pool lifeguarding?',
      options: [
        { letter: 'A', text: 'Both hands on back' },
        { letter: 'B', text: 'Slashing motion at back of neck' },
        { letter: 'C', text: 'Pointing to the neck' },
        { letter: 'D', text: 'Shaking the head side to side' }
      ],
      correctAnswer: 'B',
      explanation: 'A slashing motion at the back of the neck is the standardized signal indicating a suspected cervical spinal injury.'
    },
    {
      id: 25,
      category: 'Hand & Audible Signals',
      question: 'what is the critical note about all signals?',
      options: [
        { letter: 'A', text: 'They should be given only once' },
        { letter: 'B', text: 'They must be made distinctly and repeatedly until acknowledged' },
        { letter: 'C', text: 'Whistles should always accompany signals' },
        { letter: 'D', text: 'Only one type of signal should be used per incident' }
      ],
      correctAnswer: 'B',
      explanation: 'Signals must always be performed clearly and repeated until acknowledged by the receiving team member.'
    },
    {
      id: 26,
      category: 'Hand & Audible Signals',
      question: 'What is one recommendation regarding the use of whistles and public address systems?',
      options: [
        { letter: 'A', text: 'Use them constantly for safety' },
        { letter: 'B', text: 'Avoid overusing them' },
        { letter: 'C', text: 'Use them only for emergencies' },
        { letter: 'D', text: 'They should be used for all communications' }
      ],
      correctAnswer: 'B',
      explanation: 'Lifeguards should avoid overusing whistles and PA systems to prevent public desensitization and annoyance.'
    },
    {
      id: 27,
      category: 'Two-Way Radio Procedures',
      question: 'What is the first step when setting up a two-way radio?',
      options: [
        { letter: 'A', text: 'Check the battery condition' },
        { letter: 'B', text: 'Set volume control to approximately half volume' },
        { letter: 'C', text: 'Select the correct channel' },
        { letter: 'D', text: 'Test the transmission button' }
      ],
      correctAnswer: 'B',
      explanation: 'When setting up a two-way radio, the initial step is setting the volume control to approximately half volume.'
    },
    {
      id: 28,
      category: 'Two-Way Radio Procedures',
      question: 'Which channel is designated for emergency use only?',
      options: [
        { letter: 'A', text: 'Channel C' },
        { letter: 'B', text: 'Channel A or Channel 16' },
        { letter: 'C', text: 'Channel 77' },
        { letter: 'D', text: 'Any available channel' }
      ],
      correctAnswer: 'B',
      explanation: 'Channel A or Channel 16 is internationally designated as the primary emergency calling and distress channel.'
    },
    {
      id: 29,
      category: 'Two-Way Radio Procedures',
      question: 'What should be checked before using a two-way radio to ensure adequate battery?',
      options: [
        { letter: 'A', text: 'Visual inspection only' },
        { letter: 'B', text: 'The indicator should be at least 25% into the green zone with transmission button depressed' },
        { letter: 'C', text: 'Count the hours since last charge' },
        { letter: 'D', text: 'Ask another person if the battery looks full' }
      ],
      correctAnswer: 'B',
      explanation: 'Battery meter must show at least 25% into the green zone under load (with transmission button depressed).'
    },
    {
      id: 30,
      category: 'Two-Way Radio Procedures',
      question: 'What is the correct distance to hold a two-way radio or microphone from the mouth?',
      options: [
        { letter: 'A', text: '50mm' },
        { letter: 'B', text: '100mm (approximately 4 inches)' },
        { letter: 'C', text: '150mm' },
        { letter: 'D', text: '200mm' }
      ],
      correctAnswer: 'B',
      explanation: 'Hold the microphone approximately 100mm (4 inches) from your mouth for optimum audio clarity without distortion.'
    },
    {
      id: 31,
      category: 'Two-Way Radio Procedures',
      question: 'When should you press the transmit button on a radio?',
      options: [
        { letter: 'A', text: 'Before you start speaking' },
        { letter: 'B', text: 'After you finish speaking' },
        { letter: 'C', text: 'When about to speak' },
        { letter: 'D', text: 'Continuously during transmission' }
      ],
      correctAnswer: 'C',
      explanation: 'Press the PTT (push-to-talk) button right as you begin speaking, holding it down for the duration of your transmission.'
    },
    {
      id: 32,
      category: 'Two-Way Radio Procedures',
      question: 'What does the radio term "OVER" mean?',
      options: [
        { letter: 'A', text: 'The message is finished and no reply is expected' },
        { letter: 'B', text: 'You expect an answer and are waiting for a reply' },
        { letter: 'C', text: 'The conversation is ended' },
        { letter: 'D', text: 'Something went wrong with transmission' }
      ],
      correctAnswer: 'B',
      explanation: '"OVER" indicates that your transmission is ended and you expect a reply from the receiving station.'
    },
    {
      id: 33,
      category: 'Two-Way Radio Procedures',
      question: 'What does the radio term "OUT" mean?',
      options: [
        { letter: 'A', text: 'You are about to transmit again' },
        { letter: 'B', text: 'You expect a reply soon' },
        { letter: 'C', text: 'You have finished and will not transmit to the same party again without an initial call' },
        { letter: 'D', text: 'The other station is far away' }
      ],
      correctAnswer: 'C',
      explanation: '"OUT" signifies that the conversation is concluded and no further reply is expected or required.'
    },
    {
      id: 34,
      category: 'Two-Way Radio Procedures',
      question: 'According to radio procedures, can "OVER" and "OUT" be used together?',
      options: [
        { letter: 'A', text: 'Yes, always together' },
        { letter: 'B', text: 'Yes, for emergencies only' },
        { letter: 'C', text: 'No, they are never used together' },
        { letter: 'D', text: 'Yes, at the end of all transmissions' }
      ],
      correctAnswer: 'C',
      explanation: '"OVER" and "OUT" are mutually exclusive and must never be used in the same transmission.'
    },
    {
      id: 35,
      category: 'Two-Way Radio Procedures',
      question: 'When initiating a radio conversation, what should you do first?',
      options: [
        { letter: 'A', text: 'Give your own station identification' },
        { letter: 'B', text: 'Request signal strength' },
        { letter: 'C', text: 'Give the call sign of the station you are calling' },
        { letter: 'D', text: 'State the emergency' }
      ],
      correctAnswer: 'C',
      explanation: 'Always state the call sign of the station you are calling first (three times), followed by your own station ID.'
    },
    {
      id: 36,
      category: 'Two-Way Radio Procedures',
      question: 'How many times should you give the call sign of the station you are calling?',
      options: [
        { letter: 'A', text: 'Once' },
        { letter: 'B', text: 'Twice' },
        { letter: 'C', text: 'Three times' },
        { letter: 'D', text: 'As many times as needed until they respond' }
      ],
      correctAnswer: 'C',
      explanation: 'When initiating contact, state the call sign of the station being called three times.'
    },
    {
      id: 37,
      category: 'Two-Way Radio Procedures',
      question: 'What is the correct procedure if there is no answer within 30 seconds of your first call?',
      options: [
        { letter: 'A', text: 'Call a different station' },
        { letter: 'B', text: 'Repeat your call' },
        { letter: 'C', text: 'Increase the volume' },
        { letter: 'D', text: 'End the transmission' }
      ],
      correctAnswer: 'B',
      explanation: 'If no response is received within 30 seconds, repeat your call sequence.'
    },
    {
      id: 38,
      category: 'Two-Way Radio Procedures',
      question: 'What should you say after giving the call sign of the station you are calling?',
      options: [
        { letter: 'A', text: '"This is..." followed by your station identification' },
        { letter: 'B', text: '"Come in please"' },
        { letter: 'C', text: '"Do you copy?"' },
        { letter: 'D', text: '"Standing by"' }
      ],
      correctAnswer: 'A',
      explanation: 'State "This is..." followed by your own station call sign or identifier.'
    },
    {
      id: 39,
      category: 'Two-Way Radio Procedures',
      question: 'In the given radio example, what phrase ends the initial contact transmission?',
      options: [
        { letter: 'A', text: '"OVER" - indicating you expect a response' },
        { letter: 'B', text: '"OUT" - indicating the conversation is finished' },
        { letter: 'C', text: '"OVER" at the end of the message' },
        { letter: 'D', text: '"STAND BY"' }
      ],
      correctAnswer: 'A',
      explanation: 'Initial contact transmissions conclude with "OVER" to invite a response.'
    },
    {
      id: 40,
      category: 'Two-Way Radio Procedures',
      question: 'What should you do immediately after the other station acknowledges your signal?',
      options: [
        { letter: 'A', text: 'Hang up' },
        { letter: 'B', text: 'Send your message' },
        { letter: 'C', text: 'Ask permission to speak' },
        { letter: 'D', text: 'Wait 10 seconds' }
      ],
      correctAnswer: 'B',
      explanation: 'Once acknowledgement is received, proceed immediately to transmit your core message.'
    },
    {
      id: 41,
      category: 'Two-Way Radio Procedures',
      question: 'When two stations are communicating with each other, after the first call is established, which call sign can be dropped?',
      options: [
        { letter: 'A', text: 'Your own call sign' },
        { letter: 'B', text: 'The receiving station\'s call sign' },
        { letter: 'C', text: 'Both call signs' },
        { letter: 'D', text: 'Neither call sign should be dropped' }
      ],
      correctAnswer: 'B',
      explanation: 'Once radio contact is established, the receiving station call sign can be dropped for brevity.'
    },
    {
      id: 42,
      category: 'Two-Way Radio Procedures',
      question: 'What does the phrase "THIS IS AN EXERCISE ONLY" indicate in radio communication?',
      options: [
        { letter: 'A', text: 'A real emergency is occurring' },
        { letter: 'B', text: 'The transmission is a practice or drill' },
        { letter: 'C', text: 'Communication is being tested' },
        { letter: 'D', text: 'An emergency may occur soon' }
      ],
      correctAnswer: 'B',
      explanation: 'Explicitly states that the message is part of a training drill and not an actual emergency.'
    },
    {
      id: 43,
      category: 'Two-Way Radio Procedures',
      question: 'What must all stations do when they hear "RESCUE, RESCUE, RESCUE" on the radio?',
      options: [
        { letter: 'A', text: 'Continue their normal activities' },
        { letter: 'B', text: 'Stop all transmissions immediately' },
        { letter: 'C', text: 'Call for backup' },
        { letter: 'D', text: 'Increase radio volume' }
      ],
      correctAnswer: 'B',
      explanation: 'A distress prefix requires all other stations to maintain radio silence immediately.'
    },
    {
      id: 44,
      category: 'Two-Way Radio Procedures',
      question: 'When the control station hears an emergency call, what should it do?',
      options: [
        { letter: 'A', text: 'Ask for more information first' },
        { letter: 'B', text: 'Answer the call immediately' },
        { letter: 'C', text: 'Wait for a second call' },
        { letter: 'D', text: 'Consult with other stations' }
      ],
      correctAnswer: 'B',
      explanation: 'The control station must answer emergency calls instantly and coordinate the response.'
    },
    {
      id: 45,
      category: 'Two-Way Radio Procedures',
      question: 'After an emergency is resolved, what should the station that initiated the emergency do?',
      options: [
        { letter: 'A', text: 'Continue monitoring the channel' },
        { letter: 'B', text: 'Inform the network that the emergency is over' },
        { letter: 'C', text: 'Wait for instructions' },
        { letter: 'D', text: 'Switch to a different channel' }
      ],
      correctAnswer: 'B',
      explanation: 'The initiating station must broadcast an official cancellation or all-clear to resume normal channel operations.'
    },
    {
      id: 46,
      category: 'Radio Prowords',
      question: 'What does the radio word "ACKNOWLEDGE" mean?',
      options: [
        { letter: 'A', text: 'I understand the message' },
        { letter: 'B', text: 'Let me know that you have received and understood my message' },
        { letter: 'C', text: 'I am ready to proceed' },
        { letter: 'D', text: 'The message was received but not understood' }
      ],
      correctAnswer: 'B',
      explanation: '"ACKNOWLEDGE" instructs the receiver to confirm that they have received and understood the transmission.'
    },
    {
      id: 47,
      category: 'Radio Prowords',
      question: 'What does "AFFIRMATIVE" mean in radio communication?',
      options: [
        { letter: 'A', text: 'No, or permission denied' },
        { letter: 'B', text: 'Yes, or permission granted' },
        { letter: 'C', text: 'Please repeat' },
        { letter: 'D', text: 'I don\'t understand' }
      ],
      correctAnswer: 'B',
      explanation: '"AFFIRMATIVE" stands for Yes or permission granted.'
    },
    {
      id: 48,
      category: 'Radio Prowords',
      question: 'What does "SAY AGAIN" mean?',
      options: [
        { letter: 'A', text: 'You did not hear correctly' },
        { letter: 'B', text: 'Repeat all or the following part of your last transmission' },
        { letter: 'C', text: 'Speak louder' },
        { letter: 'D', text: 'Use different words' }
      ],
      correctAnswer: 'B',
      explanation: '"SAY AGAIN" requests repetition of all or part of the preceding transmission.'
    },
    {
      id: 49,
      category: 'Radio Prowords',
      question: 'What does "WILCO" stand for in radio procedures?',
      options: [
        { letter: 'A', text: 'Will communicate' },
        { letter: 'B', text: 'Will comply' },
        { letter: 'C', text: 'Will coordinate' },
        { letter: 'D', text: 'Your last message received, understood, and will be complied with' }
      ],
      correctAnswer: 'D',
      explanation: '"WILCO" is a contraction of "I have received your message, understand it, and will comply with it."'
    },
    {
      id: 50,
      category: 'Radio Prowords',
      question: 'What does "STAND BY" indicate?',
      options: [
        { letter: 'A', text: 'Be ready to move' },
        { letter: 'B', text: 'I must pause for a while; other stations may transmit' },
        { letter: 'C', text: 'Keep the line open' },
        { letter: 'D', text: 'Do not transmit' }
      ],
      correctAnswer: 'B',
      explanation: '"STAND BY" means the operator must pause briefly; other stations may transmit if necessary.'
    },
    {
      id: 51,
      category: 'Radio Prowords',
      question: 'What does the term "CORRECTION" mean in radio communication?',
      options: [
        { letter: 'A', text: 'You made an error in understanding' },
        { letter: 'B', text: 'An error has been made in transmission; the correct version follows' },
        { letter: 'C', text: 'Please correct your position' },
        { letter: 'D', text: 'Your information is incorrect' }
      ],
      correctAnswer: 'B',
      explanation: '"CORRECTION" indicates an error was made in the message and the corrected text immediately follows.'
    },
    {
      id: 52,
      category: 'Radio Prowords',
      question: 'What does "GO AHEAD" mean?',
      options: [
        { letter: 'A', text: 'Begin moving toward the objective' },
        { letter: 'B', text: 'Proceed with your message' },
        { letter: 'C', text: 'You may leave the area' },
        { letter: 'D', text: 'Start the engine' }
      ],
      correctAnswer: 'B',
      explanation: '"GO AHEAD" grants permission for the calling station to proceed with their transmission.'
    },
    {
      id: 53,
      category: 'Radio Prowords',
      question: 'What question does "HOW DO YOU READ ME?" ask?',
      options: [
        { letter: 'A', text: 'Can you understand English?' },
        { letter: 'B', text: 'What is the signal strength and clarity of my message?' },
        { letter: 'C', text: 'Can you repeat your last transmission?' },
        { letter: 'D', text: 'Are you receiving my transmission?' }
      ],
      correctAnswer: 'B',
      explanation: 'Asks the receiving station to report on signal strength and audio readability.'
    },
    {
      id: 54,
      category: 'Radio Prowords',
      question: 'What does "I SAY AGAIN" mean?',
      options: [
        { letter: 'A', text: 'I need you to listen more carefully' },
        { letter: 'B', text: 'I am repeating my message' },
        { letter: 'C', text: 'I have another message coming' },
        { letter: 'D', text: 'You did not understand' }
      ],
      correctAnswer: 'B',
      explanation: '"I SAY AGAIN" indicates the operator is repeating the transmission for clarity.'
    },
    {
      id: 55,
      category: 'Radio Prowords',
      question: 'What does "NEGATIVE" mean in radio communication?',
      options: [
        { letter: 'A', text: 'The battery is low' },
        { letter: 'B', text: 'No, permission refused, or that is not correct' },
        { letter: 'C', text: 'I don\'t hear you' },
        { letter: 'D', text: 'Please repeat' }
      ],
      correctAnswer: 'B',
      explanation: '"NEGATIVE" means No, permission refused, or incorrect.'
    },
    {
      id: 56,
      category: 'Radio Prowords',
      question: 'What does "READ BACK" instruct the receiver to do?',
      options: [
        { letter: 'A', text: 'Wait for the message again' },
        { letter: 'B', text: 'Repeat all or the specified part of this message back exactly as received' },
        { letter: 'C', text: 'Acknowledge receipt' },
        { letter: 'D', text: 'Confirm the signal strength' }
      ],
      correctAnswer: 'B',
      explanation: '"READ BACK" instructs the receiving operator to repeat the message verbatim to guarantee accuracy.'
    },
    {
      id: 57,
      category: 'Radio Prowords',
      question: 'What does "ROGER" or "MESSAGE RECEIVED" mean?',
      options: [
        { letter: 'A', text: 'I understand the message' },
        { letter: 'B', text: 'I have received all of your last transmission' },
        { letter: 'C', text: 'Please repeat' },
        { letter: 'D', text: 'I am ready to receive' }
      ],
      correctAnswer: 'B',
      explanation: '"ROGER" confirms that the transmission has been successfully received in full.'
    },
    {
      id: 58,
      category: 'Radio Prowords',
      question: 'What does "SPEAK SLOWER" indicate?',
      options: [
        { letter: 'A', text: 'You spoke too fast' },
        { letter: 'B', text: 'Speak more clearly' },
        { letter: 'C', text: 'Speak at a slower speed' },
        { letter: 'D', text: 'Reduce the volume' }
      ],
      correctAnswer: 'C',
      explanation: 'Instructs the transmitting operator to reduce their speaking speed for better comprehension.'
    },
    {
      id: 59,
      category: 'Radio Maintenance',
      question: 'After a day\'s patrol, what should be the first step in radio maintenance?',
      options: [
        { letter: 'A', text: 'Charge the batteries' },
        { letter: 'B', text: 'Use a dry cloth to remove sand' },
        { letter: 'C', text: 'Check the volume control' },
        { letter: 'D', text: 'Switch off the power' }
      ],
      correctAnswer: 'B',
      explanation: 'Removing sand and salt residue with a soft, dry cloth is the essential first step after patrol.'
    },
    {
      id: 60,
      category: 'Radio Maintenance',
      question: 'What should be checked monthly for radios?',
      options: [
        { letter: 'A', text: 'Battery level only' },
        { letter: 'B', text: 'Cleaning with a brush and checking connections on the base set and IRB radio' },
        { letter: 'C', text: 'Volume settings only' },
        { letter: 'D', text: 'Channel frequencies' }
      ],
      correctAnswer: 'B',
      explanation: 'Monthly checks require brush cleaning and terminal connection inspections on both base sets and IRB radios.'
    },
    {
      id: 61,
      category: 'Radio Maintenance & Water Damage',
      question: 'If a radio is dropped in surf, what is the first action to take?',
      options: [
        { letter: 'A', text: 'Immediately use it to call for help' },
        { letter: 'B', text: 'Turn the set off' },
        { letter: 'C', text: 'Remove the carry case' },
        { letter: 'D', text: 'Rinse it with tap water' }
      ],
      correctAnswer: 'B',
      explanation: 'Powering off the radio immediately prevents electrical short-circuits.'
    },
    {
      id: 62,
      category: 'Radio Maintenance & Water Damage',
      question: 'When a radio has been dropped in saltwater, should sprays be used for cleaning?',
      options: [
        { letter: 'A', text: 'Yes, immediately' },
        { letter: 'B', text: 'Yes, after drying' },
        { letter: 'C', text: 'No, sprays can damage radio components as they contain oil' },
        { letter: 'D', text: 'Only if water is still visible' }
      ],
      correctAnswer: 'C',
      explanation: 'Avoid using oily sprays directly on water-damaged internal electrical components.'
    },
    {
      id: 63,
      category: 'Radio Maintenance',
      question: 'What should be done to the aerial after radio maintenance is complete?',
      options: [
        { letter: 'A', text: 'Leave it extended' },
        { letter: 'B', text: 'Wipe it off and spray with Q20 before closing' },
        { letter: 'C', text: 'Wrap it in cloth' },
        { letter: 'D', text: 'Replace it' }
      ],
      correctAnswer: 'B',
      explanation: 'Wipe aerials clean and apply a light protective spray such as Q20 before retracting.'
    },
    {
      id: 64,
      category: 'Radio Maintenance',
      question: 'How should the aerial be closed after maintenance?',
      options: [
        { letter: 'A', text: 'All at once with force' },
        { letter: 'B', text: 'Section by section, starting from the base working upwards' },
        { letter: 'C', text: 'Slowly and carefully over several minutes' },
        { letter: 'D', text: 'By hand only, no tools' }
      ],
      correctAnswer: 'B',
      explanation: 'Close aerials section by section starting from the base upwards to prevent bending or jamming.'
    },
    {
      id: 65,
      category: 'Radio Maintenance',
      question: 'How often should NiCad batteries be charged?',
      options: [
        { letter: 'A', text: 'Daily' },
        { letter: 'B', text: 'Weekly' },
        { letter: 'C', text: 'As per club instructions' },
        { letter: 'D', text: 'Only when empty' }
      ],
      correctAnswer: 'C',
      explanation: 'NiCad batteries must be maintained and charged strictly according to club standard operating procedures and manufacturer recommendations.'
    },
    {
      id: 66,
      category: 'Radio Maintenance & Water Damage',
      question: 'What is the critical first step after a radio has been dropped in surf?',
      options: [
        { letter: 'A', text: 'Dry it with a towel' },
        { letter: 'B', text: 'Test if it still works' },
        { letter: 'C', text: 'Turn the set off immediately' },
        { letter: 'D', text: 'Rinse it under fresh water' }
      ],
      correctAnswer: 'C',
      explanation: 'Switching off the radio instantly is the vital first countermeasure against water ingress damage.'
    },
    {
      id: 67,
      category: 'Radio Maintenance & Water Damage',
      question: 'After a radio is dropped in water, how should it be rinsed?',
      options: [
        { letter: 'A', text: 'With saltwater' },
        { letter: 'B', text: 'With hot water only' },
        { letter: 'C', text: 'Under tap water to remove salt and sand, then submerge in clean water' },
        { letter: 'D', text: 'With chemical cleaner' }
      ],
      correctAnswer: 'C',
      explanation: 'Rinse thoroughly under fresh tap water to remove salt/sand, then follow proper drying procedures.'
    },
    {
      id: 68,
      category: 'Radio Maintenance & Water Damage',
      question: 'What is the minimum time frame that radios should be kept in a warm environment after water exposure?',
      options: [
        { letter: 'A', text: 'Until they appear dry' },
        { letter: 'B', text: 'A few hours' },
        { letter: 'C', text: 'Thoroughly, which may take several hours' },
        { letter: 'D', text: 'Overnight' }
      ],
      correctAnswer: 'C',
      explanation: 'Water-exposed radios must be dried thoroughly in a warm environment, which may take several hours.'
    },
    {
      id: 69,
      category: 'Radio Maintenance & Water Damage',
      question: 'When reassembling a radio after water damage, what must be used?',
      options: [
        { letter: 'A', text: 'Used batteries' },
        { letter: 'B', text: 'New batteries' },
        { letter: 'C', text: 'The original batteries if they are dry' },
        { letter: 'D', text: 'Any available batteries' }
      ],
      correctAnswer: 'B',
      explanation: 'Use new or fully inspected replacement batteries after water damage incidents to ensure safe power delivery.'
    },
    {
      id: 70,
      category: 'Radio Maintenance & Water Damage',
      question: 'What should be done if a radio does not work after following the water damage procedure?',
      options: [
        { letter: 'A', text: 'Keep trying to fix it' },
        { letter: 'B', text: 'Send it in for professional repair' },
        { letter: 'C', text: 'Replace it with a new one' },
        { letter: 'D', text: 'Attempt to disassemble it further' }
      ],
      correctAnswer: 'B',
      explanation: 'If a radio fails to function after water rescue procedures, tag it out of service and send it to professional technicians for repair.'
    }
  ]
};
