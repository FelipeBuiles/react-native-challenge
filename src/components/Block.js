import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { BodyText, Card, CardContent, Overline } from "material-bread";
import { BlockDataType } from "./Node";
import colors from "../constants/colors";

const style = StyleSheet.create({
  card: {
    backgroundColor: colors.blockBackground,
    marginBottom: 10
  },
  id: {
    color: colors.blockId,
    fontWeight: "bold",
    marginBottom: 5
  },
  body: {
    color: colors.text
  }
});

const Block = ({ id, text }) => (
  <Card style={style.card}>
    <CardContent>
      <Overline text={id.padStart(3, "0")} style={style.id} />
      <BodyText type={1} text={text} style={style.body} />
    </CardContent>
  </Card>
);

Block.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string
};

export default Block;
