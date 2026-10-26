import ReactPlayer from 'react-player'

type LessonVideoProps = {
  url: string
}

export default function LessonVideo({ url }: LessonVideoProps) {
  return (
    <div className="aspect-video w-full">
      <ReactPlayer src={url} controls width="100%" height="100%" />
    </div>
  )
}
