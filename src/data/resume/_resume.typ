// https://github.com/typst/packages/tree/main/packages/preview/imprecv
#import "@preview/imprecv:1.0.1": *

#let cvdata = yaml("resume.yaml")

#let uservars = (
  headingfont: ("Signifier"),
  bodyfont: ("Signifier"),
  fontsize: 10pt,
  linespacing: 6pt,
  showAddress: false, // true/false show address in contact info
  showNumber: false,  // true/false show phone number in contact info
  showTitle: false,   // true/false show title in heading
  sendnote: false,    // set to false to have sideways endnote
  sectionspacing: 4pt,
  headingsmallcaps: true
)

#let customrules(doc) = {
  set page(
    paper: "a4",
    number-align: center,
    margin: (
      x: 1.23cm,
      y: 1cm
    )
  )
  set list(indent: 1.15em) // indent bullet list for legibility
  set document(
    title: [Baraq Kamsani - Resume],
    author: "Baraq Kamsani",
    keywords: ("resume"),
    date: datetime.today(),
  )
  doc
}

#let cvinit(doc) = {
  doc = setrules(uservars, doc)
  doc = showrules(uservars, doc)
  doc = customrules(doc)

  doc
}

// ========================================================================== //

#show: doc => cvinit(doc)

#cvheading(cvdata, uservars)
#v(2.5pt)
#cvwork(cvdata, title: "Experience")
#cveducation(cvdata)
#cvprojects(cvdata)
#cvaffiliations(cvdata)
#cvskills(cvdata, title: "Skills and Interests")
