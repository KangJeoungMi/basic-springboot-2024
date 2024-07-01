import logo from './logo.svg';
import './App.css';
import CustomButton from './component/CustomButton';

// 데이터 생성 시 보통 const
const ironMan = {
  name : 'Trony Stark',
  heroname: 'Iron-man',
  imgUrl : 'https://cdn.pixabay.com/photo/2020/11/28/03/19/iron-man-5783522_640.png',
  imgsize: 100
}

const weapons = [
  { title : 'Replusor Beam', idx : 1},
  { title : 'Unibeam Blaster', idx : 2},
  { title : 'Smart missile', idx : 3}
];

const listWeapons = weapons.map(weapon => 
  <li key={weapon.idx}>
    {weapon.title}
  </li>
)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{ironMan.heroname}</h1>
        <img className='profile'
              src = {ironMan.imgUrl}
              alt={ironMan.name} 
              style={{
                width:ironMan.imgsize,
                height:ironMan.imgsize,
                borderRadius: '50%'
              }}/>

        <ul>{listWeapons}</ul>
        <CustomButton/>
      </header>
    </div>
  );
}

export default App;