# Modern Jive Moves

An interactive map of modern jive moves, for exploring and practicing.

**Live site:** https://anotheredward.github.io/mj-moves/

Every move starts and finishes in a particular **hand hold**. The app draws
the moves as a graph: the four hand holds are the boxes, and each move is a
line from the hold it starts in to the hold it finishes in. Following the
lines shows which moves can follow each other without a hand change, which
moves need one, and what that hand change is.

Unofficially inspired by [Fevah Modern Jive](https://fevah.dance/). It isn't
affiliated with Fevah. Move names and class combinations follow its beginner
and intromediate lists.

## The hand holds

Each box shows the lead's hands (blue, bottom) and the follow's hands (grey,
top). The filled squares show which hands are joined:

| Hold          | Lead's hand → follow's hand |
|---------------|-----------------------------|
| **L to R**    | lead's left, follow's right (the home position) |
| **R to R**    | lead's right, follow's right |
| **R to L**    | lead's right, follow's left |
| **Both hands**| both |

## What it does

### Combinations
- **Class combinations** and the **Beginner's Super Combo** (every beginner
  move once, in the order with the fewest hand changes).
- Choosing a combination lights up its moves on the graph. A comet travels
  the route in order, and the hand holds outline in blue as it passes.
- Hand changes (*swap to R*, *drop R*, *offer L*...) are drawn as dashed
  lines. Alternative endings, such as Basket *keep both*, are tagged on the
  move.
- **Random Combo:** a random combination of 2 to 5 moves that flows without
  hand changes, optionally finishing where it started.
- **Shuffle Order:** the same moves in a new order, optionally with as few
  hand changes as possible. Or replace a hand change with a real move.
- **Build a Combo:** tap moves to make your own. Moves that flow on from the
  last one are listed first.
- **Favourites:** star any combination, give it a name, and tick it off
  each time you practise it.
- **Share:** every combination has its own link, e.g.
  `?moves=accordion,shoulder-block,block-and-turn&combo=4`.

### Moves
- Tap a move on the graph, or in the bar at the top, to see its details:
  - its level
  - the hand holds it starts and finishes in
  - its **Feel** (energy, distance and smoothness), which you can change to
    match how you dance it
  - your own **notes**
  - which moves flow into and out of it
  - the class combinations it's in
  - a link to the Fevah videos
- Intromediate moves can be hidden.

### New Moves
- Add your own **intermediate moves** and **variations** of moves you know,
  with the hand holds they start and finish in.
- They're listed in a table, or grouped by **status** (from *Haven't
  learned it yet* to *Feels natural*) or **priority**.
- Each move has its own page:
  - a main video, plus more examples. Videos can come from your camera
    roll or a link, and YouTube, Instagram, Vimeo and TikTok links play on
    the page.
  - the steps, written by counts (1-4, 5-8...)
  - its feel and your notes
- New moves join the graph, Random Combo, Build a Combo, the Move Caller
  and the flashcards. **Only show new moves** in the menu filters to just
  them.

### Practice
- **Move Caller:** for practising to a song. After a countdown it reads out
  a random combination, then waits as long as dancing it takes (16 counts a
  move at 130 bpm by default) before calling the next. Each combination
  starts in the hand hold the last one finished in.
- **Flashcards:** a simple spaced-repetition deck (like Anki) of the moves.
  Build each move up in your head in order (feet and position, arms, lead
  and follow turns and changes of place, details), then grade yourself:
  *Don't know*, *Ok* or *Details perfect*.
- **Practice Log:** a dated diary of classes and practice sessions, with
  notes, the combinations you worked on, and a video (from your camera roll
  or a link).
- **Statistics:**
  - how the moves and class combinations fit together
  - a practice calendar and streaks
  - the feel of the moves and combinations
  - your flashcard progress

### Everything else
- Light and dark themes (Auto follows your device), and layouts for phones
  and desktops.
- **Backup & restore** of everything you've saved, optionally including
  videos.

## Your data

There's no account and no server. Everything you add (new moves, notes,
favourites, feel, flashcards, the Practice Log and videos) is saved only in your
browser on that device. Use **Backup & restore** in the menu to keep a copy
or move it to another device. Clearing your browser's site data deletes it.

## Running it locally

It's a single static page with no build step:

```sh
git clone git@github.com:anotheredward/mj-moves.git
cd mj-moves
python3 -m http.server      # then open http://localhost:8000/
```

Opening `index.html` directly works too. Data saved that way is kept
separately from the live site.

## How it's built

- `index.html`: the whole app (HTML, CSS and JavaScript in one file).
- `vendor/cytoscape-3.35.0.min.js`: [Cytoscape.js](https://js.cytoscape.org/)
  draws the graph. The version is pinned because the comet and the line
  highlights read some of its internals (`edgeCurves` / `labelBox`).

### Changing the moves

The data is at the top of the script in `index.html`:

- `MOVES`: each move's name, start and finish hold, level, and feel.
- `COMBINATIONS` and `SUPER_COMBO`: the class combinations.
- `MOVE_VARIATIONS`: move-specific hand changes and alternative endings.
- `HAND_SWAPS`: general hand changes between holds.

A check at startup warns in the browser console about misspelt moves,
unknown values, and combinations with no known way between two moves.
