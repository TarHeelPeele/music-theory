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
            name: 'Banjo'
            , strings: 4
            , frets: 22
            , stringTunings: ["D","B", "G", "D"]
        }
        , {
            name: 'Fiddle'
            , strings: 4
            , frets: 8
            , stringTunings: ["E", "A", "D", "G"]
        }
        , {
            name: 'Banjo Double C'
            , strings: 4
            , frets: 22
            , stringTunings: ["D","C", "G", "C"]
        }
    ]
    ,scales:[
        {name: "Major", intervals: [2,2,1,2,2,2]}
        , {name: "Major Pentatonic", intervals: [2,2,3,2]}
        , {name: "Minor", intervals: [2,1,2,2,1,2]}
        , {name: "Minor Pentatonic", intervals: [3,2,2,3]}
        , {name : "Mixolydian", intervals: [2,2,1,2,2,1]}
    ]
}