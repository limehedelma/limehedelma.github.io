
import './App.css'


function App() {

  return (
      <>
          <div className="board -clearfix">

              <div className="label --info -bordered  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  Work in progress
              </div>


              <footer className="w-full bg-black text-orange-400 p-4 flex justify-center fixed bottom-0 left-0">
                  <div className="flex flex-wrap gap-4">
                      <a
                          href="https://limehedelma.itch.io/"
                          className="-bordered label button -blink text-center "
                      >
                          Itch.io
                      </a>
                      <a
                          href="mailto:limehedelma@gmail.com"
                          className="-bordered label button -blink text-center "
                      >
                          Email
                      </a>
                      <a
                          href="https://discord.com/users/534676989198729217"
                          className="-bordered label button -blink text-center "
                      >
                          Discord
                      </a>
                      <a
                          href="https://github.com/limehedelma"
                          className="-bordered label button -blink text-center "
                      >
                          Github
                      </a>
                  </div>
              </footer>


          </div>
      </>
  )
}

export default App
