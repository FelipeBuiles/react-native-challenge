import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { ProgressCircle, Caption } from "material-bread";
import { BlocksListDataType } from "./Node";
import Block from "./Block";

const Blocks = ({ blocks, loading, error }) => {
  if (loading) {
    return <ProgressCircle indeterminate />;
  }

  if (error) {
    return <Caption text={"Something went wrong fetching these blocks"} />;
  }

  if (!blocks.length) {
    return <Caption text={"No blocks found for this node"} />;
  }

  return (
    <View>
      {blocks.map(block => (
        <Block key={block.id} id={block.id} text={block.attributes.data} />
      ))}
    </View>
  );
};

Blocks.propTypes = {
  blocks: BlocksListDataType
};

export default Blocks;
