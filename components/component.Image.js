export default function Image(props) {
  const { src, srcSet = [], className = '', alt = '' } = props;

  function getSrcSet() {
    if (srcSet.length > 0) {
      let result = '';

      for (let i = 0; i < 2; i++) {
        if (i === 0) result += `${srcSet[i]} 2x`;
        if (i === 1) result += `, ${srcSet[i]} 3x`;
      }
      
      return {
        srcSet: result
      }
    }

    return {};
  };

  function getClassName() {
    if (!className) return {};

    return {
      className
    }
  };

  return (
    <img 
      src={src}
      alt={alt}
      {...getSrcSet()}
      {...getClassName()}
    />
  )
}
