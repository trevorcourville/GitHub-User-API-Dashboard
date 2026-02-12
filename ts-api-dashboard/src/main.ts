// TypeScript interface to store GitHub user data
interface GitHubUser {
  login: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
}

const input = document.getElementById("username") as HTMLInputElement
const button = document.getElementById("searchBtn") as HTMLButtonElement
const result = document.getElementById("result") as HTMLDivElement

// On click, fetch GitHub user data and display it
button.addEventListener("click", async () => {
  const username = input.value.trim()
  if (!username) return

  result.innerHTML = "Loading..."

  try {
    // Check if user exists by fetching from GitHub API
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (!response.ok) throw new Error("User not found")

    // Parse response as GitHubUser
    const user: GitHubUser = await response.json()

    // Display user info
    result.innerHTML = `
      <img src="${user.avatar_url}" width="100"/>
      <p><strong>${user.login}</strong></p>
      <p>Repos: ${user.public_repos}</p>
      <p>Followers: ${user.followers}</p>
      <p>Following: ${user.following}</p>
    `
  } catch (err) {
    result.innerHTML = "Error fetching user."
  }
})
