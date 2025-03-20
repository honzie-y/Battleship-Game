

const HighScores = () => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center min-h-[calc(100vh-150px)]">
      <h1 className="font-barrio text-xl sm:text-2xl">THE TOP 15 PLAYERS IN THE GAME</h1>
      <table className="w-fit text-[13px] sm:text-[16px]">
          <tr>
              <th scope="col">username</th>
              <th scope="col" >games won</th>
              <th scope="col">games lost</th>
              <th scope="col">score</th>
          </tr>
          <tr>
              <th scope="row">cybernova</th>
              <td>50</td>
              <td>5</td>
              <td>95</td>
          </tr>
          <tr>
              <th scope="row">virtual-Vortex</th>
              <td>50</td>
              <td>10</td>
              <td>90</td>
          </tr>
          <tr>
              <th scope="row">aurora_phoenix</th>
              <td>50</td>
              <td>12</td>
              <td>88</td>
          </tr>
          <tr>
              <th scope="row">cerberus123knight</th>
              <td>48</td>
              <td>9</td>
              <td>87</td>
          </tr>
          <tr>
              <th scope="row">lokiwhisper-x</th>
              <td>50</td>
              <td>14</td>
              <td>86</td>
          </tr>
          <tr>
              <th scope="row">tidal8storm</th>
              <td>49</td>
              <td>12</td>
              <td>86</td>
          </tr>
          <tr>
              <th scope="row">binaryBlade</th>
              <td>48</td>
              <td>10</td>
              <td>86</td>
          </tr>
          <tr>
              <th scope="row">starfforge</th>
              <td>48</td>
              <td>11</td>
              <td>85</td>
          </tr>
          <tr>
              <th scope="row">ninja-narwhal</th>
              <td>48</td>
              <td>12</td>
              <td>84</td>
          </tr>
          <tr>
              <th scope="row">dancingd0d0</th>
              <td>47</td>
              <td>10</td>
              <td>84</td>
          </tr>
          <tr>
              <th scope="row">riddle8unner</th>
              <td>46</td>
              <td>10</td>
              <td>82</td>
          </tr>
          <tr>
              <th scope="row">enigmaedge</th>
              <td>45</td>
              <td>10</td>
              <td>80</td>
          </tr>
          <tr>
              <th scope="row">questk1per</th>
              <td>45</td>
              <td>11</td>
              <td>79</td>
          </tr>
          <tr>
              <th scope="row">waffle202wizard</th>
              <td>44</td>
              <td>10</td>
              <td>78</td>
          </tr>
          <tr>
              <th scope="row">pixelphantom77</th>
              <td>44</td>
              <td>11</td>
              <td>77</td>
          </tr>
      </table>
    </div>
  )
};

export default HighScores;