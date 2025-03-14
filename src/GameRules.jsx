

const GameRules = () => {
  return (
    <div className="text-[16px] sm:text-[18px] mt-4">
        <p>
            Battleship is a two-player strategy game where each player 
            has a fleet of ships placed on a grid. The traditional game 
            is played on a 10x10 grid using coordinates (A-J for rows, 1-10 
            for columns).
        </p>
        <p className="mt-4">
            Each player has five ships of different lengths:
            <ul>
                <li>Aircraft Carrier - 5 spaces</li>
                <li>Battleship - 4 spaces</li>
                <li>Cruiser - 3 spaces</li>
                <li>Submarine - 3 spaces</li>
                <li>Destroyer - 2 spaces</li>
            </ul>
        </p>
        <p className="mt-4">
            Core rules:
            <ol>
            <li>Before play begins, each player secretly arranges their ships 
            on their grid. Ships can be placed horizontally or vertically, 
            but not diagonally. Ships cannot overlap or extend beyond the 
            grid.</li>
            <li>Players take turns calling out one coordinate at a time (like 
            "B5"), trying to hit their opponent's ships.</li>
            <li>The opponent must respond truthfully with either "hit" if the 
            coordinate strikes a ship, or "miss" if it hits empty water.</li>
            <li>Players should track their shots on a separate "tracking grid," 
            marking hits and misses to remember where they've already fired.</li>
            <li>When all squares of a ship are hit, the owner must announce "You 
            sunk my [ship name]!"</li>
            <li>The game ends when one player has sunk all of their opponent's 
            ships.</li>
            </ol>
        </p>
        <p>
            The key to winning is using a combination of strategy and 
            probability to efficiently hunt down ships while keeping track 
            of successful hits and patterns.
        </p>
        <footer className="mt-5">
            <p className="font-barrio">Made by Hongzhang(yu.hongz@northeastern.edu)</p> 
        </footer>
    </div>
  )
};

export default GameRules;