import Card from '../components/Card.jsx'
import LoggedIn from "../containers/LoggedIn.jsx";
const LoggedInHome = () => {

  // if (cookie.tokenForAuth) {
  //   setShowUserIcon(true);
  // }
  // const checkForCookie=() => {
  //   console.log('enter');
  //   if(cookie.tokenForAuth)
  //   setShowUserIcon(true);
  //   return true;
  // }
  // the above commented part is part of infinite rendering.The error also occurs if we try to set a component's state immediately, without using a condition or an event handler.

  return (
    <>
      <LoggedIn currActive='home'>
        <div className="beatblazePlaylists p-4">
          <h1 className="text-2xl">BeatBlaze Playlists</h1>
          <div className="cardContainer mt-8 overflow-y-auto grid gap-x-2 grid-flow-col-dense sm:grid-flow-row-dense sm:grid sm: gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5" style={{ maxHeight: '65vh' }}>

            <Card
              source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
            🎤🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
            weaves musical magic. 🎵✨"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
            🎤🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
            weaves musical magic. 🎵✨"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
            🎤🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
            weaves musical magic. 🎵✨"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
                🎤🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
            weaves musical magic. 🎵✨"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
            🎤🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
            weaves musical magic. 🎵✨"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
            🎤🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
            weaves musical magic. 🎵✨"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
            🎤🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
            weaves musical magic. 🎵✨"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
            🎤🔥"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
                weaves musical magic. 🎵✨"></Card>
            <Card
              source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
          </div>
        </div>
      </LoggedIn>
    </>
  )
}

export default LoggedInHome;
