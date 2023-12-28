export default function sortByName(people) {
  return people.sort((a, b) => a.name.split(' ')[1].localeCompare(b.name.split(' ')[1]));
}
