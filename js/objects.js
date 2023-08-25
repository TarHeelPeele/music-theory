const app = {
    notes:[
        {
            name: 'A',
            value: 0
        }
        , {
            name: 'A#/Bb',
            value: 1
        }
        , {
            name: 'B',
            value: 2
        }
        , {
            name: 'C',
            value: 3
        }
        , {
            name: 'C#/Db',
            value: 4
        }
        , {
            name: 'D',
            value: 5
        }
        , {
            name: 'D#/Eb',
            value: 6
        }
        , {
            name: 'E',
            value: 7
        }
        , {
            name: 'F',
            value: 8
        }
        , {
            name: 'F#/Gb',
            value: 9
        }
        , {
            name: 'G',
            value: 10
        }
        , {
            name: 'Ab/G#',
            value: 11
        }
    
    ]
    ,instruments:[
        {
            name: 'Guitar'
            , strings: 6
            , frets: 20
            , stringTunings: ["E","B","G","D","A","E"]
        }
        , {
            name: 'Banjo Open G tuning'
            , strings: 4
            , frets: 22
            , stringTunings: ["D","B", "G", "D"]
        }
        , {
            name: 'Banjo Sawmill'
            , strings: 4
            , frets: 22
            , stringTunings: ["D","C", "G", "D"]
        }
        , {
            name: 'Banjo Double C'
            , strings: 4
            , frets: 22
            , stringTunings: ["D","C", "G", "C"]
        }
        , {
            name: 'Banjo Double A'
            , strings: 4
            , frets: 22
            , stringTunings: ["B","A", "E", "A"]
        }
        , {
            name: 'Banjo Lost Lula tuning'
            , strings: 4
            , frets: 22
            , stringTunings: ["C#/Db","B", "F#/Gb", "C#/Db"]
        }
        , {
            name: 'Fiddle'
            , strings: 4
            , frets: 8
            , stringTunings: ["E", "A", "D", "G"]
        }
        , {
            name: 'Fiddle AEAE'
            , strings: 4
            , frets: 8
            , stringTunings: ["E", "A", "E", "A"]
        }
    ]
    ,scales:[
        {name: "Major (Ionian)", intervals: [2,2,1,2,2,2], chords:['Maj','Min', 'Min', 'Maj', 'Maj', 'Min', 'Dim']}
        , {name: "Major Pentatonic", intervals: [2,2,3,2]}
        , {name: "Minor (Aeolian)", intervals: [2,1,2,2,1,2], chords:['Min', 'Dim', 'Maj', 'Min', 'Min','Maj','Maj']}
        , {name: "Minor Pentatonic", intervals: [3,2,2,3]}
        , {name : "Dorian", intervals: [2,1,2,2,2,1]}
        , {name : "Phrygian", intervals: [1,2,2,2,1,2]}
        , {name : "Lydian", intervals: [2,2,2,1,2,2]}
        , {name : "Mixolydian", intervals: [2,2,1,2,2,1]}
        , {name : "Locrian", intervals: [1,2,2,1,2,2]}
    ]
}
