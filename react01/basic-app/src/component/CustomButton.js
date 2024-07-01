
function CustomButton() {
  let isLoggedIn = false;
  let content;
  // if (isLoggedIn) {
  //   content = <button>Log Out</button>
  // } else {
  //   content = <button>Log In</button>
  // }

  return (
    <>
      {/* {content} */}
      {
        isLoggedIn ? (
          <button>Log Out</button>
        ) : (
          <button>Log In</button>
        )
      }
    </>
    // div로도 가능하지만 <>만으로도 가능
  );
}

export default CustomButton;    // 외부에서 사용하려면 필수!