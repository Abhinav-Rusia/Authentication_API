const Input = ({
    icon: Icon,
    rightIcon: RightIcon,
    onRightIconClick,
    ...props
  }) => {
    return (
      <div className="flex items-center bg-gray-700 text-white rounded-lg px-3 py-2 mb-4">
        {Icon && <Icon className="mr-2 text-gray-400" size={18} />}
        <input
          className="flex-1 bg-transparent focus:outline-none text-sm"
          {...props}
        />
        {RightIcon && (
          <RightIcon
            className="ml-2 text-gray-400 cursor-pointer"
            size={18}
            onClick={onRightIconClick}
          />
        )}
      </div>
    );
  };
  
  export default Input;
  