const React = require("react")
const DefaultLayout = require('./layout/Default.jsx')

class Index extends React.Component {
  render(){
    // const fruits = this.props.fruits
    return (
      <DefaultLayout title={"Fruits Index Page"}>
        <nav>
          <a href="/fruits/new">Create a New Fruit</a>
        </nav>
        <ul>
        {this.props.fruits.map((fruit,i) => {
                  return <li key={i}>
                      <a href={`/fruits/${fruit.id}`}>{fruit.name}</a>
                       --{ fruit.readyToEat? <span>it is ready to eat</span>: <span> it is FOUL </span>}
                      <br></br>
                      <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
                      <br></br>
                      <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                          <input type="submit" value="DELETE"/>
                      </form>
                      <br></br>
                  </li>
              })}
        </ul>
      </DefaultLayout>
    )
  }
}

module.exports = Index