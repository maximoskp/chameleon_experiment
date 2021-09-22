% Lily was here -- automatically converted by /usr/bin/midi2ly from melody2_BachChorales[0 2 3 5 7 8 10]_grp0_BBVL__6ym6hp22a.mid
\version "2.14.0"

\layout {
  \context {
    \Voice
    \remove "Note_heads_engraver"
    \consists "Completion_heads_engraver"
    \remove "Rest_engraver"
    \consists "Completion_rest_engraver"
  }
}

trackAchannelA = {


  \key c \major
    
  \set Staff.instrumentName = "melody"
  

  \key c \major
  
  \time 6/8 
  
}

trackAchannelB = \relative c {
  r8 a'' c e4 e8 
  | % 2
  f4 f8 e4 e8 
  | % 3
  e d c b4 d8 
  | % 4
  d c d e4. 
  | % 5
  r8 a, c e4 e8 
  | % 6
  f4 f8 e4 e8 
  | % 7
  e d c b4 d8 
  | % 8
  d c b a2. 
}

trackA = <<
  \context Voice = voiceA \trackAchannelA
  \context Voice = voiceB \trackAchannelB
>>


trackBchannelA = {
  
  \set Staff.instrumentName = "harmonic  rhythm"
  

  \key c \major
  
  \time 6/8 
  
}

trackBchannelB = \relative c {
  r4. <a' c' e >4. 
  | % 2
  <f d'' a b >4. <e gis' b >4. 
  | % 3
  <e a' c >4. <e g' b >4. 
  | % 4
  <d b'' f >4. <e gis' b d >4. 
  | % 5
  <a c' e >4. <a c' e >4. 
  | % 6
  <f d'' a b >4. <e gis' b >4. 
  | % 7
  <e a' c >4. <e g' b >4. 
  | % 8
  <d b'' f >4 <e gis' b d, >8 <a, cis' e >2. 
}

trackB = <<
  \context Voice = voiceA \trackBchannelA
  \context Voice = voiceB \trackBchannelB
>>


\score {
  <<
    \context Staff=trackA \trackA
    \context Staff=trackB \trackB
  >>
  \layout {}
  \midi {}
}
