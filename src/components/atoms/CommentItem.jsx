export const CommentItem = ({
  comment = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel non autem nostrum ea? Molestiae ab autem obcaecati quasi blanditiis exercitationem  maxime provident et incidunt nobis dolorum laborum est nam alias eveniet velit, atque quae praesentium voluptas sint illo tempore natus eligendi ea. Autem, quos dolores.',
  profileImage = 'https://i.pngimg.me/thumb/f/720/c3f2c592f9.jpg',
  username = 'Username',
}) => {
  return (
    <div className="flex flex-row gap-5 items-center  m-3">
      <img
        src={profileImage}
        alt="img-thumb-profile"
        className="w-[25px] h-[25px] rounded-full"
      />
      <p className="text-sm">
        <span className="font-extrabold text-green-400">{username} </span>
        {comment}
      </p>
    </div>
  );
};
